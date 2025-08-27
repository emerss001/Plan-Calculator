import { useQuery } from "@tanstack/react-query";

export interface GetMetricsResponse {
    totalSales: number;
    todaySales: number;
    confirmedSales: number;
    totalDevices: number;
}

export function useGetMetrics() {
    const token = localStorage.getItem("token");

    return useQuery<GetMetricsResponse>({
        queryKey: ["get-metrics"],
        queryFn: async () => {
            if (!token) throw new Error("Token não encontrado");

            const response = await fetch(`http://localhost:3000/admin/metrics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao buscar métricas");
            }

            const result: GetMetricsResponse = await response.json();
            return result;
        },
        enabled: !!token,
    });
}
