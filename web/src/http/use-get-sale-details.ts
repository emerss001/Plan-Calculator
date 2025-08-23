import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export interface GetSaleDetailsResponse {
    sale: {
        id: "78477868-56a2-4971-b4a4-5d136913992b";
        totalDevices: 3;
        createdAt: "2025-08-23T14:01:43.232Z";
        client: {
            name: "Emerson Neves";
            email: "eme@gmail.com";
            telephone: "(77) 98145-1450";
        };
        plan: {
            name: "Diamante";
            price: "130";
            speed_mbps: 800;
        };
    };
}

export function useGetSaleDetails() {
    return useMutation({
        mutationKey: ["get-sale-details"],
        mutationFn: async (saleId: string) => {
            const response = await fetch(`${urlBase}/sale/${saleId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch sale details");
            }

            const result: GetSaleDetailsResponse = await response.json();
            return result;
        },
    });
}
