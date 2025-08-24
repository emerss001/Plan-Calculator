import { useQuery } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export interface GetSalesClientesResponse {
    id: string;
    name: string;
    email: string;
    telephone: string;
    Sale: [
        {
            id: string;
            createdAt: string;
            gamer: boolean;
            totalDevices: number;
            plan: {
                name: "Diamante" | "Ouro" | "Prata" | "Bronze";
            };
        }
    ];
}

export function useGetSalesClients() {
    return useQuery({
        queryKey: ["get-sales-clients"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`${urlBase}/admin/vendas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result: GetSalesClientesResponse[] = await response.json();

            return result;
        },
    });
}
