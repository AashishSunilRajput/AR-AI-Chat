import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, subject and message are required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CLEAN DATA
    // ==========================================

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanSubject = String(subject).trim();
    const cleanMessage = String(message).trim();

    // ==========================================
    // NAME VALIDATION
    // ==========================================

    if (cleanName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be at least 2 characters.",
        },
        { status: 400 }
      );
    }

    if (cleanName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name cannot exceed 100 characters.",
        },
        { status: 400 }
      );
    }

    if (!/^[A-Za-z\s'-]+$/.test(cleanName)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name can contain only letters, spaces, hyphens and apostrophes.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // SUBJECT VALIDATION
    // ==========================================

    if (cleanSubject.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Subject must be at least 3 characters.",
        },
        { status: 400 }
      );
    }

    if (cleanSubject.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Subject cannot exceed 200 characters.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // MESSAGE VALIDATION
    // ==========================================

    if (cleanMessage.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Message must be at least 10 characters.",
        },
        { status: 400 }
      );
    }

    if (cleanMessage.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Message cannot exceed 2000 characters.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // SMTP ENVIRONMENT CHECK
    // ==========================================

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.CONTACT_EMAIL
    ) {
      console.error(
        "SMTP environment variables are missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    // ==========================================
    // SMTP TRANSPORTER
    // ==========================================

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // ==========================================
    // LEAD EMAIL
    // ==========================================

    await transporter.sendMail({
      from: `"AR AI Chat" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `📩 New AR AI Chat Contact Enquiry: ${cleanSubject}`,

      html: `
        <h2>New AR AI Chat Contact Enquiry</h2>

        <p>
          <strong>Name:</strong>
          ${cleanName}
        </p>

        <p>
          <strong>Email:</strong>
          ${cleanEmail}
        </p>

        <p>
          <strong>Subject:</strong>
          ${cleanSubject}
        </p>

        <h3>Message</h3>

        <p>
          ${cleanMessage}
        </p>
      `,
    });

    // ==========================================
    // CLIENT CONFIRMATION EMAIL
    // ==========================================

    await transporter.sendMail({
      from: `"AR AI Chat" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "We received your message - AR AI Chat",

      html: `
        <h2>Thanks, ${cleanName}!</h2>

        <p>
          We have received your message.
        </p>

        <p>
          Our team will review your enquiry and
          get back to you within one business day.
        </p>

        <p>
          <strong>Subject:</strong>
          ${cleanSubject}
        </p>

        <p>
          Regards,<br />
          <strong>AR AI Chat Team</strong>
        </p>
      `,
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}