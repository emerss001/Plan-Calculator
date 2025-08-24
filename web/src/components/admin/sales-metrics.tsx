import { BarChart3, Monitor, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface SalesMetricsProps {
    totalSales: number;
    todaySales: number;
    totalDevices: number;
    confirmedSales: number;
}

const SalesMetrics = ({ todaySales, totalSales, totalDevices, confirmedSales }: SalesMetricsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total vendas</p>
                            <p className="text-2xl font-bold">{totalSales}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total venda Hoje</p>
                            <p className="text-2xl font-bold">{todaySales}</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Dispositivos</p>
                            <p className="text-2xl font-bold">{totalDevices}</p>
                        </div>
                        <Monitor className="w-8 h-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Vendas efetivadas</p>
                            <p className="text-2xl font-bold">{confirmedSales}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-orange-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SalesMetrics;
