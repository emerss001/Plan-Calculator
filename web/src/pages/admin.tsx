import { useState } from "react";
import SalesMetrics from "../components/admin/sales-metrics";
import Sidebar from "../components/admin/sidebar";
import Navigation from "../components/navigation";
import SalesTable from "../components/admin/sales-table";
import { useGetSalesClients } from "../http/use-get-sales-clients";
import ExcelUploadModal from "../components/admin/excel-upload-modal";

const AdminPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const { data } = useGetSalesClients();

    return (
        <>
            <Navigation currentPage="admin" />

            <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
                <Sidebar />

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
                    <SalesMetrics totalSales={50} confirmedSales={20} todaySales={7} totalDevices={8} />

                    {data ? (
                        <SalesTable
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            salesItem={data}
                            setIsUploadModalOpen={setIsUploadModalOpen}
                        />
                    ) : (
                        <h3>Não foi possível buscar as vendas</h3>
                    )}
                </div>

                <ExcelUploadModal isOpen={isUploadModalOpen} setIsUploadModalOpen={setIsUploadModalOpen} />
            </div>
        </>
    );
};

export default AdminPage;
