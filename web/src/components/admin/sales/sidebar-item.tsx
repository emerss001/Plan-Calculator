import type { ElementType } from "react";

interface SidebarItemProps {
    Icon: ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const SidebarItem = ({ Icon, label, isActive, onClick }: SidebarItemProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    );
};

export default SidebarItem;
