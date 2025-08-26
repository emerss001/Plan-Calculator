import { Calculator, LogOut, ShoppingCart, UserCheck, Users } from "lucide-react";
import SidebarItem from "./sales/sidebar-item";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const router = useNavigate();

    const onLogout = () => {
        localStorage.removeItem("token");
        router("/");
    };

    return (
        <div className="w-50 bg-white border-r border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-800">Admin</span>
            </div>

            <nav className="space-y-2">
                <SidebarItem
                    Icon={Calculator}
                    label="Calculadora"
                    isActive={activeTab === "calculadora"}
                    onClick={() => (window.location.href = "/")}
                />
                <SidebarItem
                    Icon={ShoppingCart}
                    label="Vendas"
                    isActive={activeTab === "vendas"}
                    onClick={() => setActiveTab("vendas")}
                />

                <SidebarItem
                    Icon={UserCheck}
                    label="Confirmar Venda"
                    isActive={activeTab === "confirmar"}
                    onClick={() => setActiveTab("confirmar")}
                />
            </nav>

            <div className="mt-auto pt-8 w-full">
                <Button
                    variant="outline"
                    onClick={onLogout}
                    className="flex items-center gap-2 text-red-600 border-red-200 w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
