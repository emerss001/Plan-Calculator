import { Monitor, Search, Users, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import type { GetSalesClientesResponse } from "../../../http/use-get-sales-clients";
import { Badge } from "../../ui/badge";
import { Collapsible, CollapsibleContent } from "../../ui/collapsible";
import { Button } from "../../ui/button";
import { useState } from "react";
import { getPlanBadgeColor } from "../../../helpers/badge-colors";

interface SalesTable {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    salesItem: GetSalesClientesResponse[];
    setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalesTable = ({ searchTerm, setSearchTerm, salesItem, setIsUploadModalOpen }: SalesTable) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        Lista de Vendas
                        <CardDescription className="mt-1 text-sm text-gray-500 font-normal">
                            Clique na linha com mais de uma venda para expandir
                        </CardDescription>
                    </CardTitle>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Importar Excel
                        </Button>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Cliente</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Email</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">
                                    Telefone
                                </TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">
                                    N° Vendas
                                </TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Plano</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">
                                    Dispositivos
                                </TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Data</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {salesItem.map((item) => {
                                const isExpanded = expandedItems.has(item.id);
                                const hasMultipleSales = item.Sale.length > 1;

                                return (
                                    <Collapsible
                                        key={item.id}
                                        open={isExpanded}
                                        onOpenChange={() => hasMultipleSales && toggleItem(item.id)}
                                        asChild
                                    >
                                        <>
                                            <TableRow
                                                className={`border-b border-gray-100 hover:bg-gray-50 ${
                                                    hasMultipleSales ? "cursor-pointer" : "cursor-default"
                                                }`}
                                                onClick={() => hasMultipleSales && toggleItem(item.id)}
                                            >
                                                <TableCell className="py-4 px-4 text-gray-600">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <Users className="w-4 h-4 text-gray-600" />
                                                        </div>
                                                        <span className="font-medium">{item.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-4 text-gray-600 truncate">
                                                    {item.email}
                                                </TableCell>
                                                <TableCell className="py-4 px-4 text-gray-600">
                                                    {item.telephone}
                                                </TableCell>
                                                <TableCell className="py-4 px-4 text-gray-600">
                                                    <Badge variant="secondary">{item.Sale.length} vendas</Badge>
                                                </TableCell>
                                                <TableCell className="py-4 px-4 text-gray-600">
                                                    <Badge className={getPlanBadgeColor(item.Sale[0]?.plan?.name)}>
                                                        {item.Sale[0]?.plan?.name}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-4 px-4 text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Monitor className="w-4 h-4 text-gray-400" />
                                                        <span>{item.Sale[0]?.totalDevices || 0}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-4 text-gray-600">
                                                    {new Date(item.Sale[0]?.createdAt || new Date()).toLocaleDateString(
                                                        "pt-BR"
                                                    )}
                                                </TableCell>
                                            </TableRow>

                                            {/* Conteúdo expandido */}
                                            {hasMultipleSales && (
                                                <CollapsibleContent asChild>
                                                    <TableRow className="bg-gray-50">
                                                        <TableCell colSpan={7} className="p-4">
                                                            <div className="space-y-2">
                                                                <h4 className="font-medium text-gray-700">
                                                                    Outras vendas:
                                                                </h4>
                                                                {item.Sale.slice(1).map((sale, index) => (
                                                                    <div
                                                                        className="grid grid-cols-[100px_150px_200px_200px] items-center gap-4 text-sm text-gray-600"
                                                                        key={sale.id}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                                            <p>Venda #{index + 1}</p>
                                                                        </div>

                                                                        <span>Dispositivos: {sale.totalDevices}</span>

                                                                        <span>
                                                                            Plano:{" "}
                                                                            <Badge
                                                                                className={getPlanBadgeColor(
                                                                                    sale.plan.name
                                                                                )}
                                                                            >
                                                                                {sale.plan?.name}
                                                                            </Badge>
                                                                        </span>

                                                                        <span>
                                                                            Data:{" "}
                                                                            {new Date(
                                                                                sale.createdAt
                                                                            ).toLocaleDateString("pt-BR")}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </CollapsibleContent>
                                            )}
                                        </>
                                    </Collapsible>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesTable;
