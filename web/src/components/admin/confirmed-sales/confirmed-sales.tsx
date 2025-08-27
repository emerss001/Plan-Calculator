import { useState } from "react";
import FormDatas from "./form-datas";
import SalesTableFiltered from "./sales-table-filtered";
import { useGetSalesFiltered } from "../../../http/use-get-sales-filtereds";

const ConfirmedSales = () => {
    const [filters, setFilters] = useState({
        name: "",
        email: "",
        telephone: "",
    });

    const { data: salesFiltered, refetch } = useGetSalesFiltered(filters);

    return (
        <div className="flex-1 p-4 md:p-8 min-w-0">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Confirmar Vendas</h1>
                    <p className="text-gray-600">Busque e confirme vendas específicas</p>
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

            <div className="space-y-6">
                <FormDatas filters={filters} setFilters={setFilters} onSearch={refetch} />
                {salesFiltered && <SalesTableFiltered data={salesFiltered} />}
            </div>
        </div>
    );
};

export default ConfirmedSales;
