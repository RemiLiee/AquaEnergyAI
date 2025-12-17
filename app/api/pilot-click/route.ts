import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, userAgent, referer } = body;

    // Send e-post til deg
    const emailContent = `
Hei!

Noen har nettopp klikket på "Book gratis pilot" knappen på AquaEnergy AI nettsiden.

Detaljer:
- Kilde: ${source || 'Ukjent'}
- Side: ${referer || 'Ukjent'}
- Tidspunkt: ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}
- User Agent: ${userAgent || 'Ukjent'}

Dette er en automatisk varsling fra nettsiden.

---
AquaEnergy AI
    `.trim();

    const emailResult = await resend.emails.send({
      from: 'AquaEnergy AI <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'remi_lie98@me.com',
      reply_to: process.env.CONTACT_EMAIL || 'remi_lie98@me.com',
      subject: '🚀 Noen har klikket på "Book gratis pilot"',
      text: emailContent,
    });

    console.log('Pilot click notification sent:', emailResult);

    return NextResponse.json({ 
      success: true, 
      message: 'Notification sent',
      emailId: emailResult.data?.id 
    });
  } catch (error) {
    console.error('Error sending pilot click notification:', error);
    
    // Don't fail silently - return error but log it
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

