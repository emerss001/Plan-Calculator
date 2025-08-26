import { useMemo, useState } from "react";
import type { GetMetricsResponse } from "../../../http/use-get-metrics";
import type { GetSalesClientesResponse } from "../../../http/use-get-sales-clients";
import ExcelUploadModal from "./excel-upload-modal";
import SalesMetrics from "./sales-metrics";
import SalesTable from "./sales-table";

interface SalesProps {
    metricsData: GetMetricsResponse;
    salesClients: GetSalesClientesResponse[];
}

const Sales = ({ metricsData, salesClients }: SalesProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const filteredSales = useMemo(() => {
        if (!salesClients) return [];

        return salesClients.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.telephone.includes(searchTerm) ||
                item.Sale.some((sale) => sale.plan?.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [salesClients, searchTerm]);

    return (
        <>
            <div className="flex-1 p-4 md:p-8 min-w-0">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Vendas</h1>
                        <p className="text-gray-600">Todas vendas</p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5G4FTTEW1L51vrKfSAfylmTirYbI6O.png"
                            alt="MICKS FIBRA"
                            width={200}
                            height={60}
                            className="h-12 w-auto"
                        />
                    </div>
                </div>

                {metricsData && <SalesMetrics {...metricsData} />}

                {salesClients ? (
                    <SalesTable
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        salesItem={filteredSales}
                        setIsUploadModalOpen={setIsUploadModalOpen}
                    />
                ) : (
                    <h3>Não foi possível buscar as vendas</h3>
                )}
            </div>

            <ExcelUploadModal isOpen={isUploadModalOpen} setIsUploadModalOpen={setIsUploadModalOpen} />
        </>
    );
};

export default Sales;
