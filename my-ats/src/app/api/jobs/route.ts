import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Job from '@/models/Job';

export async function GET() {
  await connectToDatabase();
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const { title, description } = await request.json();
  const job = await Job.create({ title, description });
  return NextResponse.json(job, { status: 201 });
}