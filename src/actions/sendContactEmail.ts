"use server";

import { Resend } from "resend";
import { getContent } from "@/lib/getContent";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const content = await getContent(); // <-- directo, sin useEffect
    const from = `${content.contact.emailFromName} <${content.contact.emailFromAddress}>`;
    const to = content.contact.emailTo;

    await resend.emails.send({
      from,
      to,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { ok: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { ok: false };
  }
}
