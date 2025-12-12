// src/app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Application from '@/models/Application';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  await connectToDatabase();
  const formData = await request.formData();

  const jobId = formData.get('jobId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const coverLetter = (formData.get('coverLetter') as string) || '';
  const resumeFile = formData.get('resume') as File;

  if (!resumeFile) {
    return NextResponse.json({ error: 'Resume is required' }, { status: 400 });
  }

  let resumeUrl = '';

  // PRODUCTION: Use Vercel Blob
  if (process.env.VERCEL) {
    const { url } = await put(`resumes/${Date.now()}-${resumeFile.name}`, resumeFile, {
      access: 'public',
    });
    resumeUrl = url;
  } 
  // LOCAL: Save to public/resumes folder
  else {
    // Create folder if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'resumes');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const filename = `${Date.now()}-${resumeFile.name}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    resumeUrl = `/resumes/${filename}`;
  }

  // Save application to MongoDB
  const application = await Application.create({
    jobId,
    name,
    email,
    resumeUrl,
    coverLetter,
  });

  return NextResponse.json(application, { status: 201 });
}