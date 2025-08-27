import { useEffect, useRef, useState } from "react";
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
    const hasCheckedAuth = useRef(false);

    const [activeTab, setActiveTab] = useState("vendas");

    const { data, refetch: refetchSales } = useGetSalesClients();
    const { data: metricsData, refetch: refetchMetrics } = useGetMetrics();

    useEffect(() => {
        if (hasCheckedAuth.current) return;
        hasCheckedAuth.current = true;

        const token = localStorage.getItem("token");
        if (!token || !isTokenValid(token)) {
            toast.error("Sessão expirada. Faça login novamente.");
            navigate("/login");
        } else {
            refetchSales();
            refetchMetrics();
        }
    }, [navigate, refetchMetrics, refetchSales]);

    return (
        <>
            <Navigation currentPage="admin" />

            <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "vendas" && <Sales metricsData={metricsData!} salesClients={data!} />}
                {activeTab === "confirmar" && <ConfirmedSales />}
            </div>
        </>
    );
};

export default AdminPage;
