import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "applications.json");

// Get all applications
export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

// Create new application
export async function POST(req: Request) {
  const body = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const newApp = {
    id: Date.now(),
    ...body,
  };

  data.push(newApp);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(newApp);
}
