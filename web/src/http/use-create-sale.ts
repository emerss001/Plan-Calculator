import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export interface CreateSaleRequest {
    name: string;
    email: string;
    telephone: string;
    planId: string;
    weightTotal: number;
    devices: {
        phones: number;
        computers: number;
        smartTvs: number;
        tvBox: number;
        others: number;
        gamer: boolean;
    };
}

export interface CreateSaleResponse {
    id: string;
}

export function useCreateSale() {
    return useMutation({
        mutationKey: ["create-sale"],
        mutationFn: async (data: CreateSaleRequest) => {
            const response = await fetch(`${urlBase}/criar-venda`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Lança um erro se a resposta da API não for de sucesso
                throw new Error("Falha ao criar a venda. Tente novamente.");
            }

            const result: CreateSaleResponse = await response.json();
            return result;
        },
    });
}
