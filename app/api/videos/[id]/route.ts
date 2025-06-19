import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const videosPath = path.join(process.cwd(), 'data', 'videos.json');

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    const filteredVideos = videosData.videos.filter(
      (video: any) => video.id !== parseInt(params.id)
    );
    videosData.videos = filteredVideos;
    fs.writeFileSync(videosPath, JSON.stringify(videosData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    const updatedVideos = videosData.videos.map((video: any) =>
      video.id === parseInt(params.id) ? { ...video, ...body } : video
    );
    videosData.videos = updatedVideos;
    fs.writeFileSync(videosPath, JSON.stringify(videosData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}
