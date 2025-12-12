import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Application from '@/models/Application';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  await connectToDatabase();
  const formData = await request.formData();
  
  const jobId = formData.get('jobId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const coverLetter = formData.get('coverLetter') as string || '';
  const resumeFile = formData.get('resume') as File;

  if (!resumeFile) return NextResponse.json({ error: 'Resume required' }, { status: 400 });

  const { url } = await put(`resumes/${Date.now()}-${resumeFile.name}`, resumeFile, {
    access: 'public',
  });

  const application = await Application.create({
    jobId,
    name,
    email,
    resumeUrl: url,
    coverLetter,
  });

  return NextResponse.json(application, { status: 201 });
}

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');
  const status = searchParams.get('status');

  const filter: any = {};
  if (jobId) filter.jobId = jobId;
  if (status) filter.status = status;

  const applications = await Application.find(filter)
    .populate('jobId', 'title')
    .sort({ appliedAt: -1 });

  return NextResponse.json(applications);
}

export async function PUT(request: Request) {
  await connectToDatabase();
  const { id, status } = await request.json();
  const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json(application);
}