import { Monitor, Search, Users, ChevronDown, ChevronRight, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { GetSalesClientesResponse } from "../../http/use-get-sales-clients";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";

interface SalesTable {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    salesItem: GetSalesClientesResponse[];
    setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalesTable = ({ searchTerm, setSearchTerm, salesItem, setIsUploadModalOpen }: SalesTable) => {
    const getPlanBadgeColor = (plan: string) => {
        if (plan.includes("Bronze")) return "bg-amber-100 text-amber-800";
        if (plan.includes("Prata")) return "bg-gray-300 text-gray-900";
        if (plan.includes("Ouro")) return "bg-yellow-100 text-yellow-800";
        if (plan.includes("Diamante")) return "bg-blue-100 text-blue-800";
        return "bg-gray-100 text-gray-800";
    };
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Lista de Vendas</CardTitle>
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
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600"></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {salesItem.map((item) => (
                                <Collapsible key={item.id} asChild>
                                    <>
                                        <TableRow className="border-b border-gray-100 hover:bg-gray-50">
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
                                            <TableCell className="py-4 px-4 text-gray-600">{item.telephone}</TableCell>
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
                                            <TableCell className="py-4 px-4 text-gray-600">
                                                {item.Sale.length > 1 ? (
                                                    <CollapsibleTrigger asChild>
                                                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                                                            <ChevronRight className="w-4 h-4 data-[state=open]:hidden" />
                                                            <ChevronDown className="w-4 h-4 hidden data-[state=open]:block" />
                                                        </button>
                                                    </CollapsibleTrigger>
                                                ) : (
                                                    "..."
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        {/* Conteúdo expandido */}
                                        <CollapsibleContent asChild>
                                            <TableRow className="bg-gray-50">
                                                <TableCell colSpan={8} className="p-4">
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium text-gray-700">Outras vendas:</h4>
                                                        {item.Sale.slice(1).map((sale) => (
                                                            <div
                                                                key={sale.id}
                                                                className="flex items-center justify-between text-sm border-b pb-2"
                                                            >
                                                                <span>{}</span>
                                                                <span>Plano: {sale.plan?.name || "Teste"}</span>
                                                                <span>Dispositivos: {sale.totalDevices}</span>
                                                                <span>
                                                                    Data:{" "}
                                                                    {new Date(sale.createdAt).toLocaleDateString(
                                                                        "pt-BR"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </CollapsibleContent>
                                    </>
                                </Collapsible>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesTable;
