import { useEffect } from "react";
import Sidebar from "../components/admin/sidebar";
import Navigation from "../components/navigation";
import { useGetSalesClients } from "../http/use-get-sales-clients";
import { useGetMetrics } from "../http/use-get-metrics";
import { isTokenValid } from "../lib/jwt-decoded";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Sales from "../components/admin/sales/sales";
import ConfirmedSales from "../components/admin/confirmed-sales/confirmed-sales";

const AdminPage = () => {
    const navigate = useNavigate();

    const { data, refetch: refetchSales } = useGetSalesClients();
    const { data: metricsData, refetch: refetchMetrics } = useGetMetrics();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !isTokenValid(token)) {
            toast.error("Sessão expirada. Faça login novamente.");
            navigate("/login");
        } else {
            refetchSales();
            refetchMetrics();
        }
    }, []);

    return (
        <>
            <Navigation currentPage="admin" />

            <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
                <Sidebar />

                {/* <Sales metricsData={metricsData!} salesClients={data!} /> */}
                <ConfirmedSales />
            </div>
        </>
    );
};

export default AdminPage;
