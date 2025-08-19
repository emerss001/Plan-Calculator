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

export const returnEmailToClient = (props: EmailClintProps) => {
    return `<!doctype html>
<html lang="pt-BR">
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        "
    >
        <div
            style="
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            "
        >
            <!-- Header -->
            <div
                style="
                    background: linear-gradient(135deg, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%);
                    padding: 30px 20px;
                    text-align: center;
                "
            >
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hhQiMuqzLXnBQS0wSINQnM0Eoq7ig8.png"
                    alt="MICKS FIBRA"
                    style="max-width: 250px; height: auto"
                />
            </div>

            <!-- Conteúdo principal -->
            <div style="padding: 40px 30px">
                <div style="font-size: 24px; color: #1e5799; margin-bottom: 20px; font-weight: 600">
                    Olá, ${props.nameClient}!
                </div>

                <div style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #555">
                    Agradecemos por escolher a MICKS FIBRA para suas necessidades de internet. Com base nas informações
                    fornecidas sobre seus dispositivos, preparamos uma análise personalizada e nossa recomendação de
                    plano ideal para você.
                </div>

                <!-- Informações do Cliente -->
                <div
                    style="
                        background-color: #f8f9fa;
                        border-left: 4px solid #2989d8;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 0 8px 8px 0;
                    "
                >
                    <div style="font-size: 18px; font-weight: 600; color: #1e5799; margin-bottom: 15px">
                        📋 Suas Informações
                    </div>
                    <div>
                        <div style="margin-bottom: 10px">
                            <div style="margin-bottom: 5px; font-size: 20px; color: #555">Nome</div>
                            <div style="font-size: 18px; color: #000000ff">${props.nameClient}</div>
                        </div>
                        <div style="margin-bottom: 10px">
                            <div style="margin-bottom: 5px; font-size: 20px; color: #555">Telefone</div>
                            <div style="font-size: 18px; color: #000000ff">${props.telephoneClient}</div>
                        </div>
                        <div>
                            <div style="margin-bottom: 5px; font-size: 20px; color: #555">Total de Dispositivos</div>
                            <div style="font-size: 18px; color: #000000ff   ">${props.devices.length}</div>
                        </div>
                    </div>
                </div>

                <!-- Dispositivos -->
                <div style="margin: 25px 0">
                    <div style="font-size: 18px; font-weight: 600; color: #1e5799; margin-bottom: 15px">
                        📱 Análise dos Seus Dispositivos
                    </div>

                    <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="border-bottom: 1px solid #eee"
                    >
                        ${props.devices.map((item) => {
                            return `<tr>
                                    <td style="padding: 12px 0; vertical-align: middle; font-size: 16px; color: #333">
                                        ${item.deviceName}
                                    </td>
                                    <td
                                        style="
                                            padding: 12px 0;
                                            vertical-align: middle;
                                            text-align: right;
                                            font-size: 16px;
                                            color: #2989d8;
                                            font-weight: 600;
                                        "
                                    >
                                        ${item.deviceWeight} pontos
                                    </td>
                                </tr>`;
                        })}
                    </table>
                </div>

                <!-- Total -->
                <div
                    style="
                        background: linear-gradient(135deg, #1e5799, #2989d8);
                        color: white;
                        padding: 25px;
                        border-radius: 8px;
                        text-align: center;
                        margin: 25px 0;
                    "
                >
                    <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px">Peso Total Calculado</div>
                    <div style="font-size: 28px; font-weight: 700; margin-bottom: 10px">${props.weightTotal} pontos</div>
                    <div style="font-size: 14px; opacity: 0.9; color: #ffffffff">Baseado na análise de todos os seus dispositivos</div>
                </div>

                <!-- Recomendação do Plano -->
                <div
                    style="
                        background: linear-gradient(135deg, #28a745, #20c997);
                        color: white;
                        padding: 30px;
                        border-radius: 8px;
                        text-align: center;
                        margin: 25px 0;
                    "
                >
                    <div style="font-size: 20px; font-weight: 600; margin-bottom: 15px">🎯 Plano Recomendado</div>
                    <div style="font-size: 32px; font-weight: 700; margin-bottom: 10px">${props.plan}</div>
                    <div style="font-size: 16px; opacity: 0.95; color: #ffffffff">
                        O plano ideal para atender todos os seus dispositivos com velocidade e estabilidade garantidas.
                    </div>
                </div>

                <div style="font-size: 16px; line-height: 1.6; color: #555">
                    Nossa análise considerou o uso simultâneo de todos os seus dispositivos para garantir que você tenha
                    a melhor experiência de internet possível. Este plano oferece a velocidade ideal para suas
                    necessidades específicas.
                </div>
            </div>

            <!-- Rodapé -->
            <div style="background-color: #1e5799; color: white; padding: 30px; text-align: center">
                <div style="font-size: 14px; line-height: 1.6; margin-bottom: 15px">
                    Entre em contato conosco para contratar seu plano ou esclarecer dúvidas. Nossa equipe está pronta
                    para oferecer o melhor atendimento!
                </div>
                <div style="font-size: 16px; font-weight: 600">📞 [TELEFONE_EMPRESA] | 📧 [EMAIL_EMPRESA]</div>
            </div>
        </div>
    </body>
</html>
`;
};
