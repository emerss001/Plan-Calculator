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
        <div className="device-card gradient-card p-4 sm:p-6 rounded-xl border border-border/50 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white rounded-lg shadow-sm flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-foreground text-base sm:text-lg truncate">{label}</span>
                        <p className="text-muted-foreground text-xs sm:text-sm">Dispositivos conectados</p>
                    </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateDevice(device, false)}
                        disabled={count === 0}
                        className="counter-button w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full border-2 hover:border-accent hover:text-accent disabled:opacity-50 flex-shrink-0"
                    >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-accent/20 flex-shrink-0 mx-1 sm:mx-0">
                        <span className="text-base sm:text-xl font-bold text-primary">{count}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateDevice(device, true)}
                        className="counter-button w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full border-2 hover:border-accent hover:text-accent flex-shrink-0"
                    >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeviceCounter;
