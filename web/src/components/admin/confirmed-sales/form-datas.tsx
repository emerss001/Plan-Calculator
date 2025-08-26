import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { SalesFilteredRequest, SalesFilteredResponse } from "../../../http/use-get-sales-filtereds";

interface FormDatasProps {
    filters: {
        name: string;
        email: string;
        telephone: string;
    };
    setFilters: (filters: FormDatasProps["filters"]) => void;
    mutate: UseMutateFunction<SalesFilteredResponse[], Error, SalesFilteredRequest, unknown>;
}

const FormDatas = ({ filters, setFilters, mutate }: FormDatasProps) => {
    const handleSearchSales = () => {
        mutate(filters);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Buscar Venda para Confirmação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente</Label>
                        <Input
                            placeholder="Digite o nome..."
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
                        <Input
                            placeholder="Digite o email..."
                            value={filters.email}
                            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Telefone</Label>
                        <Input
                            placeholder="Digite o telefone..."
                            value={filters.telephone}
                            onChange={(e) => setFilters({ ...filters, telephone: e.target.value })}
                        />
                    </div>
                    <Button
                        onClick={handleSearchSales}
                        className="bg-gradient-to-r max-w-60 from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Buscar Vendas
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FormDatas;
