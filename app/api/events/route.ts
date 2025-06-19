import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'data/events.json');
    
    // Read existing events
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    
    // Add new event
    jsonData.events.push(data);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save event' }, { status: 500 });
  }
}
