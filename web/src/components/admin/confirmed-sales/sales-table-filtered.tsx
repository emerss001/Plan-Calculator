import { Check, CheckCircle } from "lucide-react";
import type { SalesFilteredResponse } from "../../../http/use-get-sales-filtereds";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { getPlanBadgeColor } from "../../../helpers/badge-colors";

interface SalesTableFilteredProps {
    data: SalesFilteredResponse[];
}

const SalesTableFiltered = ({ data }: SalesTableFilteredProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Vendas Encontradas {data.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Cliente</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Email</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">
                                    Telefone
                                </TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Plano</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Data</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Status</TableHead>
                                <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Ação</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="py-3 px-4">{sale.client.name}</TableCell>
                                    <TableCell className="py-3 px-4">{sale.client.email}</TableCell>
                                    <TableCell className="py-3 px-4">{sale.client.telephone}</TableCell>
                                    <TableCell className="py-3 px-4">
                                        <Badge className={getPlanBadgeColor(sale.plan.name)}>{sale.plan.name}</Badge>
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        {new Date(sale.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <Badge
                                            className={
                                                sale.confirmed
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }
                                        >
                                            {sale.confirmed ? "Confirmada" : "Pendente"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        {!sale.confirmed ? (
                                            <div className="flex space-x-2">
                                                <Button
                                                    // onClick={() => confirmSpecificSale(sale.id)}
                                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                                >
                                                    <Check className="w-4 h-4 mr-1" />
                                                    Confirmar
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    // onClick={() => confirmSpecificSale(sale.id)}
                                                    className=" text-white"
                                                >
                                                    <Check className="w-4 h-4 mr-1" />
                                                    Excluir
                                                </Button>
                                            </div>
                                        ) : (
                                            <Badge className="bg-green-100 text-green-800">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Já Confirmada
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesTableFiltered;
