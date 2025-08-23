import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";
import Navigation from "../components/navigation";
import { Card, CardContent } from "../components/ui/card";
import type { SubscriberFormData } from "../components/subscriber/subscriber-form";
import PlanSummary from "../components/subscriber/plan-ummary";
import SubscriberForm from "../components/subscriber/subscriber-form";
import ConfirmationDialog from "../components/subscriber/confirmation-dialog";

// Mantenha a interface aqui ou mova para um arquivo de tipos global
interface DetailsPlanSubscription {
    id: string;
    name: string;
    speed: number;
    price: number;
    totalDevices: number;
}

const SubscriberPlanPage = () => {
    const location = useLocation();
    const planDetails = location.state as DetailsPlanSubscription;

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [formData, setFormData] = useState<SubscriberFormData | null>(null);

    if (!planDetails) {
        return <Navigate to="/" />;
    }

    // Função chamada quando o formulário é submetido com sucesso
    function handleFormSubmit(data: SubscriberFormData) {
        setFormData(data); // Salva os dados do formulário no estado
        setShowConfirmDialog(true); // Abre o diálogo de confirmação
    }

    // Função chamada quando o usuário clica em "Salvar Contrato" no diálogo
    function handleConfirmContract() {
        if (!formData) return;

        console.log("Contrato confirmado com os seguintes dados:");
        console.log("Plano:", planDetails);
        console.log("Cliente:", formData);

        // Aqui você faria a chamada para sua API para salvar o contrato

        setShowConfirmDialog(false);
        // Ex: navigate("/contrato/sucesso");
    }

    return (
        <>
            <Navigation />

            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-12 max-w-2xl">
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-xl flex items-center justify-center gap-3 mb-6 shadow-lg">
                            <FileText className="w-6 h-6" />
                            <h1 className="text-2xl font-bold">Suas Informações</h1>
                        </div>
                    </div>

                    <Card className="shadow-xl">
                        <CardContent className="p-8">
                            <PlanSummary plan={planDetails} />
                            <SubscriberForm onSubmit={handleFormSubmit} />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ConfirmationDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                onConfirm={handleConfirmContract}
            />
        </>
    );
};

export default SubscriberPlanPage;
