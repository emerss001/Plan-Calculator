import { useQuery } from "@tanstack/react-query";
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
    name?: string;
    email?: string;
    telephone?: string;
}

export function useGetSalesFiltered(filters: SalesFilteredRequest) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    return useQuery({
        queryKey: ["salesFiltered", filters],
        queryFn: async () => {
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
