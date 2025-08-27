import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export function useConfirmSale() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    return useMutation({
        mutationKey: ["confirmSale"],
        mutationFn: async (saleId: string) => {
            const response = await fetch(`${urlBase}/admin/confirm-sale/${saleId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to confirm sale");
            }

            return response.json();
        },
    });
}
