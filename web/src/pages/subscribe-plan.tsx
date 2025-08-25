import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import Navigation from "../components/navigation";
import { Card, CardContent } from "../components/ui/card";
import type { SubscriberFormData } from "../components/subscriber/subscriber-form";
import PlanSummary from "../components/subscriber/plan-ummary";
import SubscriberForm from "../components/subscriber/subscriber-form";
import ConfirmationDialog from "../components/subscriber/confirmation-dialog";
import { useCreateSale, type CreateSaleRequest } from "../http/use-create-sale";

interface DetailsPlanSubscription {
    detailsPlanSubscription: {
        weightTotal: number;
        id: string;
        name: string;
        speed: number;
        price: number;
        totalDevices: number;
    };
    devices: {
        phones: number;
        computers: number;
        smartTvs: number;
        tvBoxes: number;
        others: number;
    };
    gamer: boolean;
}

const SubscriberPlanPage = () => {
    const router = useNavigate();
    const location = useLocation();
    const { detailsPlanSubscription: planDetails, devices, gamer } = location.state as DetailsPlanSubscription;
    const { mutate: createSale, isPending } = useCreateSale();

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [formData, setFormData] = useState<SubscriberFormData | null>(null);

    if (!planDetails) {
        router("/");
    }

    function handleFormSubmit(data: SubscriberFormData) {
        setFormData(data);
        setShowConfirmDialog(true);
    }

    function handleConfirmContract() {
        if (!formData || !planDetails) return null;

        const dataRequest: CreateSaleRequest = {
            name: formData.name,
            telephone: formData.phone,
            email: formData.email,
            planId: planDetails.id,
            weightTotal: planDetails.weightTotal,
            devices: {
                computers: devices.computers,
                phones: devices.phones,
                smartTvs: devices.smartTvs,
                tvBox: devices.tvBoxes,
                others: devices.others,
                gamer,
            },
        };

        createSale(dataRequest, {
            onSuccess: (data) => {
                setShowConfirmDialog(false);
                console.log(data);
                return router(`/sale-resume/${data.id}`);
            },
            onError: (err) => {
                console.error("Ocorreu um erro:", err);
            },
        });

        setShowConfirmDialog(false);
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
                            <SubscriberForm onSubmit={handleFormSubmit} isPending={isPending} />
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
