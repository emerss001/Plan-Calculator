interface EmailAdminProps {
    nameClient: string;
    telephoneClient: string;
    devices: {
        deviceName: string;
        deviceWeight: number;
    }[];
    weightTotal: number;
    plan: string;
}

export const returnEmailToAdmin = (props: EmailAdminProps) => {
    return `<!doctype html>
<html lang="pt-BR">
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        "
    >
        <div
            style="
                max-width: 700px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            "
        >
            <!-- Header -->
            <div
                style="
                    background: linear-gradient(135deg, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%);
                    padding: 25px 20px;
                    text-align: center;
                    color: white;
                    font-size: 22px;
                    font-weight: 600;
                "
            >
                📢 Nova Venda Confirmada
            </div>

            <!-- Conteúdo principal -->
            <div style="padding: 30px 25px">
                <div
                    style="
                        font-size: 18px;
                        font-weight: 600;
                        color: #1e5799;
                        margin-bottom: 15px;
                    "
                >
                    Detalhes da Contratação
                </div>

                <!-- Informações do Cliente -->
                <div
                    style="
                        background-color: #f8f9fa;
                        border-left: 4px solid #2989d8;
                        padding: 20px;
                        margin: 20px 0;
                        border-radius: 0 8px 8px 0;
                    "
                >
                    <div style="margin-bottom: 10px">
                        <strong>Nome:</strong> ${props.nameClient}
                    </div>
                    <div style="margin-bottom: 10px">
                        <strong>Telefone:</strong> ${props.telephoneClient}
                    </div>
                    <div>
                        <strong>Total de Dispositivos:</strong> ${props.devices.length}
                    </div>
                </div>

                <!-- Dispositivos -->
                <div style="margin: 20px 0">
                    <div
                        style="
                            font-size: 16px;
                            font-weight: 600;
                            color: #1e5799;
                            margin-bottom: 10px;
                        "
                    >
                        📱 Lista de Dispositivos
                    </div>

                    <table
                        border="0"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        style="border-collapse: collapse; border-bottom: 1px solid #eee"
                    >
                        <thead>
                            <tr style="background-color: #f0f0f0; text-align: left">
                                <th style="padding: 10px; font-size: 14px; color: #555">Dispositivo</th>
                                <th style="padding: 10px; font-size: 14px; color: #555; text-align: right">Peso</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${props.devices
                                .map(
                                    (item) => `
                                <tr>
                                    <td
                                        style="
                                            padding: 10px;
                                            font-size: 15px;
                                            color: #333;
                                        "
                                    >
                                        ${item.deviceName}
                                    </td>
                                    <td
                                        style="
                                            padding: 10px;
                                            font-size: 15px;
                                            text-align: right;
                                            color: #2989d8;
                                            font-weight: 600;
                                        "
                                    >
                                        ${item.deviceWeight} pontos
                                    </td>
                                </tr>`
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>

                <!-- Total e Plano -->
                <div
                    style="
                        display: flex;
                        align-items: center;
                        margin: 25px 0;
                        flex-wrap: wrap;
                    "
                >
                    <div
                        style="
                            flex: 1;
                            background: linear-gradient(135deg, #1e5799, #2989d8);
                            color: white;
                            padding: 20px;
                            border-radius: 8px;
                            text-align: center;
                        "
                    >
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px">
                            Peso Total Calculado
                        </div>
                        <div style="font-size: 24px; font-weight: 700">
                            ${props.weightTotal.toFixed(2)} pontos
                        </div>
                    </div>

                    <div
                        style="
                            flex: 1;
                            background: linear-gradient(135deg, #28a745, #20c997);
                            color: white;
                            padding: 20px;
                            border-radius: 8px;
                            text-align: center;
                        "
                    >
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px">
                            Plano Contratado
                        </div>
                        <div style="font-size: 24px; font-weight: 700">
                            ${props.plan}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rodapé -->
            <div
                style="
                    background-color: #1e5799;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    font-size: 13px;
                "
            >
                Este é um e-mail automático gerado pelo sistema de análise e vendas.
                <br />
                O registro dessa venda pode ser encontrado em seu painel administrativo.
            </div>
        </div>
    </body>
</html>`;
};
