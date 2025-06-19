import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const testimonialsPath = path.join(process.cwd(), 'data', 'testimonials.json');

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) throw new Error('ID not found in URL');

    const testimonialsData = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
    const filteredTestimonials = testimonialsData.testimonials.filter(
      (testimonial: Testimonial) => testimonial.id !== parseInt(id)
    );
    testimonialsData.testimonials = filteredTestimonials;
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonialsData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) throw new Error('ID not found in URL');

    const body = await request.json();
    const testimonialsData = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
    const updatedTestimonials = testimonialsData.testimonials.map((testimonial: Testimonial) =>
      testimonial.id === parseInt(id) ? { ...testimonial, ...body } : testimonial
    );
    testimonialsData.testimonials = updatedTestimonials;
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonialsData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}
