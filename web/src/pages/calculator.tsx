import { Gamepad2, Monitor, Router, SmartphoneIcon, Sparkles, Tv, Zap } from "lucide-react";
import Navigation from "../components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useState } from "react";
import DeviceCounter from "../components/device-counter";
import CalculatePlanButton from "../components/calculate-plan-button";
import PlansCard from "../components/plans-card";

interface DeviceCount {
    phones: number;
    computers: number;
    smartTvs: number;
    tvBoxes: number;
    others: number;
}

const CalculatorPage = () => {
    const [devices, setDevices] = useState<DeviceCount>({
        phones: 0,
        computers: 0,
        smartTvs: 0,
        tvBoxes: 0,
        others: 0,
    });
    const [isGamer, setIsGamer] = useState(false);

    const updateDevice = (device: keyof DeviceCount, increment: boolean) => {
        setDevices((prev) => ({
            ...prev,
            [device]: Math.max(0, prev[device] + (increment ? 1 : -1)),
        }));
    };

    return (
        <>
            <Navigation />

            <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6 floating-animation">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5G4FTTEW1L51vrKfSAfylmTirYbI6O.png"
                                alt="MICKS FIBRA"
                                width={350}
                                height={120}
                                className="h-20 w-auto"
                            />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Calculadora de Planos
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Descubra o plano perfeito para sua casa. Informe seus dispositivos e encontre a
                                velocidade ideal.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <Card className="border-border/50 shadow-xl max-w-3xl w-full m-4">
                            <CardHeader className="pb-6">
                                <CardTitle className="text-2xl text-primary flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                    Seus Dispositivos
                                </CardTitle>
                                <p className="text-muted-foreground">Configure quantos dispositivos você possui</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <DeviceCounter
                                    Icon={SmartphoneIcon}
                                    label="CELULAR"
                                    device="phones"
                                    count={devices.phones}
                                    updateDevice={updateDevice}
                                />
                                <DeviceCounter
                                    Icon={Monitor}
                                    label="COMPUTADOR"
                                    device="computers"
                                    count={devices.computers}
                                    updateDevice={updateDevice}
                                />
                                <DeviceCounter
                                    Icon={Tv}
                                    label="SMART TV"
                                    device="smartTvs"
                                    count={devices.smartTvs}
                                    updateDevice={updateDevice}
                                />
                                <DeviceCounter
                                    Icon={Router}
                                    label="TV BOX"
                                    device="tvBoxes"
                                    count={devices.tvBoxes}
                                    updateDevice={updateDevice}
                                />
                                <DeviceCounter
                                    Icon={Zap}
                                    label="OUTROS"
                                    device="others"
                                    count={devices.others}
                                    updateDevice={updateDevice}
                                />

                                <div className="device-card gradient-card p-6 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/30 rounded-xl shadow-sm">
                                            <Gamepad2 className="w-6 h-6 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="gamer"
                                                className="text-lg font-semibold text-foreground cursor-pointer"
                                            >
                                                Uso internet para games
                                            </label>
                                            <p className="text-muted-foreground text-sm">
                                                Requer maior velocidade e estabilidade
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsGamer(!isGamer)}
                                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                                                    isGamer ? "bg-gradient-to-r from-accent to-accent/80" : "bg-white"
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-6 w-6 transform rounded-full bg-gray-400 shadow-lg transition-transform duration-300 ${
                                                        isGamer ? "translate-x-7" : "translate-x-1"
                                                    }`}
                                                >
                                                    {isGamer && (
                                                        <Gamepad2 className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <CalculatePlanButton devices={devices} gamer={isGamer} />
                            </CardContent>
                        </Card>
                    </div>

                    <PlansCard />
                </div>
            </div>
        </>
    );
};

export default CalculatorPage;
