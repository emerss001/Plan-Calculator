import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import type { ElementType } from "react";

interface DeviceCount {
    phones: number;
    computers: number;
    smartTvs: number;
    tvBoxes: number;
    others: number;
}

interface DeviceCounterProps {
    Icon: ElementType;
    label: string;
    device: keyof DeviceCount;
    count: number;
    updateDevice: (device: keyof DeviceCount, increment: boolean) => void;
}

const DeviceCounter = ({ Icon, label, device, count, updateDevice }: DeviceCounterProps) => {
    return (
        <div className="device-card gradient-card p-6 rounded-xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <span className="font-semibold text-foreground text-lg">{label}</span>
                        <p className="text-muted-foreground text-sm">Dispositivos conectados</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateDevice(device, false)}
                        disabled={count === 0}
                        className="counter-button w-10 h-10 p-0 rounded-full border-2 hover:border-accent hover:text-accent disabled:opacity-50"
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-accent/20">
                        <span className="text-xl font-bold text-primary">{count}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateDevice(device, true)}
                        className="counter-button w-10 h-10 p-0 rounded-full border-2 hover:border-accent hover:text-accent"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeviceCounter;
