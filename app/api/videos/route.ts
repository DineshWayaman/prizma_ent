import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const videosPath = path.join(process.cwd(), 'data', 'videos.json');

export async function POST(req: Request) {
  try {
    const newVideo = await req.json();
    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    
    videosData.videos.push(newVideo);
    
    fs.writeFileSync(videosPath, JSON.stringify(videosData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving video:', error);
    return NextResponse.json(
      { error: 'Failed to save video' },
      { status: 500 }
    );
  }
}
