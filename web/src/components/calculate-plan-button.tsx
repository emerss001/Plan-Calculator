import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

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
    return (
        <div className="pt-4">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        onClick={() => {}}
                        className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-4 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Calcular Plano Ideal
                    </Button>
                </AlertDialogTrigger>
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
                                <h3 className="text-3xl font-bold mb-2 text-white">Plano Diamante</h3>
                                <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
                                <span className="text-5xl font-bold mt-4 text-accent">500Mb</span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-bold text-white">R$ 150.00</p>
                                <p className="text-white/80 text-lg">por mês</p>
                            </div>
                            <p className="text-white/90 mt-4 text-lg">Perfeito para famílias</p>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="flex flex-col w-full space-y-2">
                            <Button
                                variant="secondary"
                                className="text-white font-bold p-5 text-lg rounded-xl shadow-lg hover:bg-accent/90"
                            >
                                Contratar Agora
                            </Button>

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
