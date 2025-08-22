import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

interface RecommendedPlanRequest {
    phones: number;
    computers: number;
    smartTvs: number;
    tvBox: number;
    others: number;
    gamer: boolean;
}

export interface RecommendedPlanResponse {
    weightTotal: number;
    planRecommended: {
        id: string;
        name: string;
        price: number;
        description: string;
        speed_mbps: number;
        weightMin: number;
        weightMax: number | null;
    };
}

export function useGetRecommendedPlan() {
    return useMutation({
        mutationKey: ["get-plan-recommended"],
        mutationFn: async (data: RecommendedPlanRequest) => {
            const response = await fetch(`${urlBase}/calcular-plano`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result: RecommendedPlanResponse = await response.json();

            return result;
        },
    });
}
