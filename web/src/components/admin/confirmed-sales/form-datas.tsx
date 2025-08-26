import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState } from "react";

const FormDatas = () => {
    const [confirmSearchName, setConfirmSearchName] = useState("");
    const [confirmSearchEmail, setConfirmSearchEmail] = useState("");
    const [confirmSearchPhone, setConfirmSearchPhone] = useState("");

    const handleSearchSales = () => {
        // Implement your search logic here
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Buscar Venda para Confirmação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label>Nome do Cliente</Label>
                            <Input
                                placeholder="Digite o nome..."
                                value={confirmSearchName}
                                onChange={(e) => setConfirmSearchName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                placeholder="Digite o email..."
                                value={confirmSearchEmail}
                                onChange={(e) => setConfirmSearchEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Telefone</Label>
                            <Input
                                placeholder="Digite o telefone..."
                                value={confirmSearchPhone}
                                onChange={(e) => setConfirmSearchPhone(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleSearchSales}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Buscar Vendas
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FormDatas;
