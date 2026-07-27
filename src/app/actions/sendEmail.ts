"use server";

import nodemailer from "nodemailer";

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function sendEmailAction(data: ContactFormData) {
    const { name, email, phone, message } = data;

    // Základní validace
    if (!name || !email || !message) {
        return { success: false, error: "Vyplňte všechna povinná pole." };
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_RECIPIENT || "radim.petruska@gmail.com";

    if (!user || !pass) {
        console.warn("SMTP credentials (SMTP_USER / SMTP_PASS) are missing in environment variables.");
        return {
            success: false,
            error: "Formulář zatím nemá nastavené SMTP přihlašovací údaje (SMTP_USER a SMTP_PASS v proměnných prostředí)."
        };
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: {
                user,
                pass,
            },
        });

        const subject = `[Zpráva z webu] ${name}`;

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #2563eb; color: #ffffff; padding: 20px 24px;">
                <h2 style="margin: 0; font-size: 20px; font-weight: bold;">✉️ Nová zpráva z webového formuláře</h2>
                <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">finemedica.cz</p>
            </div>
            <div style="padding: 24px; color: #1e293b;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #64748b;">Jméno:</td>
                        <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${escapeHtml(name)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #64748b;">E-mail:</td>
                        <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Telefon:</td>
                        <td style="padding: 8px 0; color: #0f172a;"><a href="tel:${escapeHtml(phone)}" style="color: #0f172a; text-decoration: none;">${escapeHtml(phone || "-")}</a></td>
                    </tr>
                </table>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <h3 style="font-size: 16px; margin: 0 0 12px 0; color: #334155;">Zpráva od klienta:</h3>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #334155;">${escapeHtml(message)}</div>
            </div>
            <div style="background-color: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #64748b; text-align: center;">
                Tento e-mail byl automaticky odeslán z kontaktního formuláře na webu finemedica.cz. Pro odpověď přímo klientovi stačí kliknout na tlačítko "Odpovědět".
            </div>
        </div>
        `;

        await transporter.sendMail({
            from: `"FineMedica Web" <${user}>`,
            to: recipient,
            replyTo: email,
            subject,
            html: htmlContent,
            text: `Nová zpráva z webu finemedica.cz:\n\nJméno: ${name}\nE-mail: ${email}\nTelefon: ${phone}\n\nZpráva:\n${message}`,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to send email via SMTP:", error);
        return {
            success: false,
            error: error?.message || "Chyba při odesílání e-mailu skrze SMTP."
        };
    }
}

function escapeHtml(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
