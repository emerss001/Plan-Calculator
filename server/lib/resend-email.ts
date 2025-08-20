import { Resend } from "resend";
import { env } from "../src/env.ts";
import { returnEmailToClient } from "../src/emails/email-client.ts";

interface EmailClintProps {
    nameClient: string;
    telephoneClient: string;
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
        from: "Acme <onboarding@resend.dev>",
        to: ["emerson.dev.gbi@gmail.com"],
        subject: "Contratação de Plano de Internet",
        html: returnEmailToClient(props),
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
}

export async function sendEmailAdmin(props: EmailClintProps) {
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["emerson.dev.gbi@gmail.com"],
        subject: "Contratação de Plano de Internet",
        html: returnEmailToClient(props),
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
}
