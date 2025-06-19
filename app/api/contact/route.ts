import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const adminEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #F9B104; color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #F9B104; }
    .footer { text-align: center; margin-top: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <p class="label">Name:</p>
        <p>${data.name}</p>
      </div>
      <div class="field">
        <p class="label">Email:</p>
        <p>${data.email}</p>
      </div>
      <div class="field">
        <p class="label">Phone:</p>
        <p>${data.phone}</p>
      </div>
      <div class="field">
        <p class="label">Subject:</p>
        <p>${data.subject}</p>
      </div>
      <div class="field">
        <p class="label">Message:</p>
        <p>${data.message}</p>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Prizma Entertainment. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const userEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #F9B104; color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .thank-you { font-size: 24px; color: #F9B104; margin-bottom: 20px; }
    .social-links { text-align: center; margin-top: 20px; }
    .social-links a { color: #F9B104; text-decoration: none; margin: 0 10px; }
    .footer { text-align: center; margin-top: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us!</h1>
    </div>
    <div class="content">
      <p class="thank-you">Dear ${data.name},</p>
      <p>Thank you for reaching out to Prizma Entertainment. We have received your message and will get back to you shortly.</p>
      <p>Here's what you sent us:</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <div class="social-links">
        <p>Follow us on social media:</p>
        <a href="https://www.tiktok.com/@prizmasl">TikTok</a>
        <a href="https://www.instagram.com/prizmasl/">Instagram</a>
        <a href="https://web.facebook.com/Prizmasl">Facebook</a>
        <a href="https://www.youtube.com/@prizmasl">YouTube</a>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Prizma Entertainment. All rights reserved.</p>
      <p>This is an automated response. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

interface EmailError extends Error {
  message: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Send both emails
    await Promise.all([
      // Email to business
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@prizmalive.com',
        subject: `New Contact Form Submission: ${data.subject}`,
        html: adminEmailTemplate(data),
      }),
      // Email to user
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: 'Thank you for contacting Prizma Entertainment',
        html: userEmailTemplate(data),
      })
    ]);

    return NextResponse.json({ success: true, message: 'Emails sent successfully' });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const emailError = error as EmailError;
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error sending email', 
        error: emailError.message || 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
