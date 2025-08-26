import { Resend } from "resend";
import { env } from "../src/env.ts";
import { returnEmailToClient } from "../src/emails/email-client.ts";
import { returnEmailToAdmin } from "../src/emails/email-admin.ts";

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

export async function sendEmailClient(props: EmailClintProps) {
    const { data, error } = await resend.emails.send({
        from: "Micks Fibra <onboarding@resend.dev>",
        to: ["emerson.dev.gbi@gmail.com", props.emailClient],
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
        to: ["emerson.dev.gbi@gmail.com"],
        subject: "Contratação de Plano de Internet",
        html: returnEmailToAdmin(props),
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
}
