import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Video {
  id: number;
  title: string;
  videoId: string;
  description: string;
}

const videosPath = path.join(process.cwd(), 'data', 'videos.json');

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) throw new Error('ID not found in URL');

    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    const filteredVideos = videosData.videos.filter(
      (video: Video) => video.id !== parseInt(id)
    );
    videosData.videos = filteredVideos;
    fs.writeFileSync(videosPath, JSON.stringify(videosData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) throw new Error('ID not found in URL');

    const body = await request.json();
    const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    const updatedVideos = videosData.videos.map((video: Video) =>
      video.id === parseInt(id) ? { ...video, ...body } : video
    );
    videosData.videos = updatedVideos;
    fs.writeFileSync(videosPath, JSON.stringify(videosData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}
