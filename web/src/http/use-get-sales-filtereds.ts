import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export interface SalesFilteredResponse {
    id: string;
    createdAt: string;
    confirmed: boolean;
    client: {
        name: string;
        email: string;
        telephone: string;
    };
    plan: {
        name: string;
    };
}

export interface SalesFilteredRequest {
    name: string;
    email: string;
    telephone: string;
}

export function useGetSalesFiltered() {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    return useMutation({
        mutationKey: ["salesFiltered"],
        mutationFn: async (filters: SalesFilteredRequest) => {
            const response = await fetch(`${urlBase}/admin/get-sales-filtered`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(filters),
            });
            if (!response.ok) throw new Error("Failed to fetch sales");
            const result: SalesFilteredResponse[] = await response.json();
            return result;
        },
    });
}
