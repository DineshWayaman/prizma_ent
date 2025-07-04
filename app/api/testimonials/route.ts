import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'data/testimonials.json');
    
    // Read existing testimonials
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    
    // Add new testimonial
    jsonData.testimonials.push(data);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save testimonial' }, { status: 500 });
  }
}
