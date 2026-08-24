import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      website,
      industry,
      teamSize,
      details,
    } = body;

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (!name || !email || !company) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and company are required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CLEAN DATA
    // ==========================================

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = phone ? String(phone).trim() : "";
    const cleanCompany = String(company).trim();
    const cleanWebsite = website
      ? String(website).trim()
      : "";
    const cleanIndustry = industry
      ? String(industry).trim()
      : "";
    const cleanTeamSize = teamSize
      ? String(teamSize).trim()
      : "";
    const cleanDetails = details
      ? String(details).trim()
      : "";

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
    // ENVIRONMENT CHECK
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
          message: "Email service is not configured.",
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
      from: `"TT AI Chat" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: "🚀 New TT AI Chat Demo Request",

      html: `
        <h2>New TT AI Chat Demo Request</h2>

        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Phone:</strong> ${cleanPhone || "Not provided"}</p>
        <p><strong>Company:</strong> ${cleanCompany}</p>
        <p><strong>Website:</strong> ${cleanWebsite || "Not provided"}</p>
        <p><strong>Industry:</strong> ${cleanIndustry || "Not provided"}</p>
        <p><strong>Team Size:</strong> ${cleanTeamSize || "Not provided"}</p>

        <h3>Message</h3>
        <p>${cleanDetails || "No additional details provided."}</p>
      `,
    });

    // ==========================================
    // CLIENT CONFIRMATION EMAIL
    // ==========================================

    await transporter.sendMail({
      from: `"TT AI Chat" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "Thanks for requesting an TT AI Chat demo",

      html: `
        <h2>Thanks, ${cleanName}!</h2>

        <p>
          We received your demo request for TT AI Chat.
        </p>

        <p>
          Our team will review your requirements and
          get back to you shortly.
        </p>

        <p>
          Regards,<br />
          <strong>TT AI Chat Team</strong>
        </p>
      `,
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message:
        "Demo request submitted successfully.",
    });
  } catch (error) {
    console.error("Demo API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit demo request. Please try again later.",
      },
      { status: 500 }
    );
  }
}