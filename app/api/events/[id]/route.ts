import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const eventsPath = path.join(process.cwd(), 'data', 'events.json');

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    const filteredEvents = eventsData.events.filter(
      (event: any) => event.id !== parseInt(params.id)
    );
    eventsData.events = filteredEvents;
    fs.writeFileSync(eventsPath, JSON.stringify(eventsData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    const updatedEvents = eventsData.events.map((event: any) =>
      event.id === parseInt(params.id) ? { ...event, ...body } : event
    );
    eventsData.events = updatedEvents;
    fs.writeFileSync(eventsPath, JSON.stringify(eventsData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
