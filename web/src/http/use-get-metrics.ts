import { useQuery } from "@tanstack/react-query";

export interface getMetricsResponse {
    totalSales: number;
    todaySales: number;
    totalDevices: number;
}

export function useGetMetrics() {
    return useQuery({
        queryKey: ["get-metrics"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/admin/metrics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result: getMetricsResponse = await response.json();

            return result;
        },
    });
}
