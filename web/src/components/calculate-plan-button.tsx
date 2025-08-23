import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { useGetRecommendedPlan } from "../http/use-get-recommended-plan";
import { useState } from "react";
import { Link } from "react-router-dom";

interface RecommendedPlan {
    devices: {
        phones: number;
        computers: number;
        smartTvs: number;
        tvBoxes: number;
        others: number;
    };
    gamer: boolean;
}

const CalculatePlanButton = ({ devices, gamer }: RecommendedPlan) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutateAsync: getPlan, data, isPending } = useGetRecommendedPlan();

    async function handleGetPlan() {
        const result = await getPlan({
            computers: devices.computers,
            phones: devices.phones,
            smartTvs: devices.smartTvs,
            tvBox: devices.tvBoxes,
            others: devices.others,
            gamer,
        });
        if (result) setIsOpen(true);
    }

    const detailsPlanSubscription = {
        id: data?.planRecommended.id,
        name: data?.planRecommended.name,
        speed: data?.planRecommended.speed_mbps,
        price: data?.planRecommended.price,
        totalDevices: devices.computers + devices.phones + devices.smartTvs + devices.tvBoxes + devices.others,
    };

    return (
        <div className="pt-4">
            <Button
                disabled={isPending}
                onClick={() => handleGetPlan()}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-4 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
                {isPending ? (
                    "Carregando"
                ) : (
                    <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Calcular Plano Ideal
                    </>
                )}
            </Button>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="bg-primary border-0">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl text-white flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-accent" />
                            Plano Recomendado
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-white/80">
                            Baseado nos seus dispositivos
                        </AlertDialogDescription>

                        <div className="text-center mb-8 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <div className="flex flex-col mb-4 justify-center items-center">
                                <h3 className="text-3xl font-bold mb-2 text-white">{data?.planRecommended.name}</h3>
                                <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
                                <span className="text-5xl font-bold mt-4 text-accent">
                                    {data?.planRecommended.speed_mbps} MBs
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-bold text-white">
                                    {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                        Number(data?.planRecommended.price)
                                    )}
                                </p>
                                <p className="text-white/80 text-lg">por mês</p>
                            </div>
                            <p className="text-white/90 mt-4 text-lg">{data?.planRecommended.description}</p>
                        </div>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <div className="flex flex-col w-full space-y-2">
                            <Link to="/subscribe" state={detailsPlanSubscription} className="w-full">
                                <Button
                                    variant="secondary"
                                    className="text-white font-bold p-5 text-lg w-full rounded-xl shadow-lg hover:bg-accent/90"
                                >
                                    Contratar Agora
                                </Button>
                            </Link>

                            <AlertDialogCancel className="text-white font-bold p-5 border-none text-lg rounded-xl shadow-lg hover:bg-accent/90">
                                Cancelar
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default CalculatePlanButton;
