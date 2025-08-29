import { Resend } from "resend";
import { env } from "../env.ts";
import { returnEmailToClient } from "../emails/email-client.ts";
import { returnEmailToAdmin } from "../emails/email-admin.ts";

interface EmailClintProps {
    nameClient: string;
    telephoneClient: string;
    emailClient: string;
    devices: {
        deviceName: string;
        deviceWeight: number;
    }[];
    weightTotal: number;
    plan: string;
}

const resend = new Resend(env.RESEND_API_KEY);
const ADMINEMAIL = "operacoes@micks.com.br";

export async function sendEmailClient(props: EmailClintProps) {
    const { data, error } = await resend.emails.send({
        from: "Micks Fibra <onboarding@resend.dev>",
        to: [props.emailClient],
        subject: "Contratação de Plano de Internet",
        html: returnEmailToClient(props),
    });

    if (error) {
        return console.error({ error });
    }
}

export async function sendEmailAdmin(props: EmailClintProps) {
    const { data, error } = await resend.emails.send({
        from: "Micks Fibra <onboarding@resend.dev>",
        to: [ADMINEMAIL],
        subject: "Contratação de Plano de Internet",
        html: returnEmailToAdmin(props),
    });

    if (error) {
        return console.error({ error });
    }
}
