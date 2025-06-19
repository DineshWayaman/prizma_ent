import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const testimonialsPath = path.join(process.cwd(), 'data', 'testimonials.json');

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const testimonialsData = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
    const filteredTestimonials = testimonialsData.testimonials.filter(
      (testimonial: any) => testimonial.id !== parseInt(params.id)
    );
    testimonialsData.testimonials = filteredTestimonials;
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonialsData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const testimonialsData = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
    const updatedTestimonials = testimonialsData.testimonials.map((testimonial: any) =>
      testimonial.id === parseInt(params.id) ? { ...testimonial, ...body } : testimonial
    );
    testimonialsData.testimonials = updatedTestimonials;
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonialsData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}
