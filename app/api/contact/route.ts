import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validering
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send e-post til deg med informasjonen som ble fylt ut
    const emailContent = `
Hei Remi!

Noen har fylt ut kontaktskjemaet på AquaEnergy AI nettsiden.

Kontaktinformasjon:
- Navn: ${name}
- E-post: ${email}
- Bedrift: ${company || 'Ikke oppgitt'}
- Tidspunkt: ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}

Melding:
${message}

---
AquaEnergy AI
    `.trim();

    const emailResult = await resend.emails.send({
      from: 'AquaEnergy AI <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'remi_lie98@me.com',
      reply_to: email, // Så du kan svare direkte til personen
      subject: `📧 Ny kontakt fra ${name}${company ? ` (${company})` : ''}`,
      text: emailContent,
    });

    console.log('Contact form submission sent:', emailResult);

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      emailId: emailResult.data?.id 
    });
  } catch (error) {
    console.error('Error sending contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

