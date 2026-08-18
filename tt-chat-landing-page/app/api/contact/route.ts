import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, subject and message are required." },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanSubject = String(subject).trim().replace(/[\r\n]+/g, " ");
    const cleanMessage = String(message).trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { success: false, message: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (!/^[A-Za-z\s'-]+$/.test(cleanName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Name can contain only letters, spaces, hyphens and apostrophes.",
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 200) {
      return NextResponse.json(
        { success: false, message: "Subject must be between 3 and 200 characters." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return NextResponse.json(
        { success: false, message: "Message must be between 10 and 2000 characters." },
        { status: 400 }
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.CONTACT_EMAIL
    ) {
      console.error("SMTP environment variables are missing.");
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const e = {
      name: escapeHtml(cleanName),
      email: escapeHtml(cleanEmail),
      subject: escapeHtml(cleanSubject),
      message: escapeHtml(cleanMessage).replace(/\n/g, "<br />"),
    };

    await transporter.sendMail({
      from: `"TT Chat" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `📩 New TT Chat Contact Enquiry: ${cleanSubject}`,
      html: `
        <div style="margin:0;background:#f8fafc;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#071a3d,#2563eb,#06b6d4);padding:24px 28px;color:#ffffff">
              <div style="font-size:24px;font-weight:800">TT Chat</div>
              <div style="margin-top:5px;font-size:13px;opacity:.85">New contact enquiry</div>
            </div>
            <div style="padding:28px">
              <h2 style="margin:0 0 20px;font-size:22px">New TT Chat Contact Enquiry</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:10px 0;color:#64748b;width:130px">Name</td><td style="padding:10px 0;font-weight:600">${e.name}</td></tr>
                <tr><td style="padding:10px 0;color:#64748b">Email</td><td style="padding:10px 0">${e.email}</td></tr>
                <tr><td style="padding:10px 0;color:#64748b">Subject</td><td style="padding:10px 0;font-weight:600">${e.subject}</td></tr>
              </table>
              <div style="margin-top:22px;padding:18px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0">
                <div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">Message</div>
                <div style="margin-top:8px;line-height:1.7;font-size:14px">${e.message}</div>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"TT Chat" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "We received your message - TT Chat",
      html: `
        <div style="margin:0;background:#f8fafc;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
          <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#071a3d,#2563eb,#06b6d4);padding:24px 28px;color:#ffffff;font-size:24px;font-weight:800">TT Chat</div>
            <div style="padding:30px">
              <h2 style="margin:0 0 14px;font-size:24px">Thanks, ${e.name}!</h2>
              <p style="line-height:1.7;color:#475569">We have received your message.</p>
              <p style="line-height:1.7;color:#475569">Our team will review your enquiry and get back to you within one business day.</p>
              <div style="margin-top:24px;padding:16px 18px;border-radius:14px;background:#eff6ff;color:#1e3a8a;font-size:14px"><strong>Subject:</strong> ${e.subject}</div>
              <p style="margin-top:28px;line-height:1.7;color:#475569">Regards,<br /><strong style="color:#0f172a">TT Chat Team</strong><br /><span style="font-size:13px">by Tomar Techworks</span></p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
