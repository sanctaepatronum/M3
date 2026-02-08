import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import { SITE_CONFIG } from "@/lib/constants";

const SUBJECT_LABELS: Record<string, string> = {
  hr: "Conseil RH",
  recruitment: "Recrutement",
  training: "Formation",
  ip: "Propriété Intellectuelle",
  other: "Autre",
};

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = result.data;
    const subjectLabel = SUBJECT_LABELS[subject] || subject;

    const { error } = await resend.emails.send({
      from: `${SITE_CONFIG.name} <noreply@m3-consultants.net>`,
      to: [...SITE_CONFIG.emails],
      replyTo: email,
      subject: `[Contact M3] ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #c9a96e; padding-bottom: 12px;">
            Nouveau message de contact
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 120px;">Nom</td>
              <td style="padding: 8px 12px;">${name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Téléphone</td>
              <td style="padding: 8px 12px;">${phone || "Non renseigné"}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Sujet</td>
              <td style="padding: 8px 12px;">${subjectLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background-color: #f5f5f5; border-left: 4px solid #c9a96e;">
            <h3 style="margin: 0 0 8px 0; color: #1a1a2e;">Message</h3>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Ce message a été envoyé depuis le formulaire de contact de m3-consultants.net
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
