import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Event {
  id: number;
  venue: string;
  location: string;
  date: string;
  ticketLink: string;
}

const eventsPath = path.join(process.cwd(), 'data', 'events.json');

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) throw new Error('ID not found in URL');

    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    const filteredEvents = eventsData.events.filter(
      (event: Event) => event.id !== parseInt(id)
    );
    eventsData.events = filteredEvents;
    fs.writeFileSync(eventsPath, JSON.stringify(eventsData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) throw new Error('ID not found in URL');

    const body = await request.json();
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    const updatedEvents = eventsData.events.map((event: Event) =>
      event.id === parseInt(id) ? { ...event, ...body } : event
    );
    eventsData.events = updatedEvents;
    fs.writeFileSync(eventsPath, JSON.stringify(eventsData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
