import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Calculator, Shield } from "lucide-react";

interface NavigationProps {
    currentPage?: "home" | "admin";
}

const Navigation = ({ currentPage = "home" }: NavigationProps) => {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5G4FTTEW1L51vrKfSAfylmTirYbI6O.png"
                        alt="MICKS FIBRA"
                        width={150}
                        height={50}
                        className="h-10 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button
                            variant={currentPage === "home" ? "default" : "ghost"}
                            className="flex items-center gap-2"
                        >
                            <Calculator className="w-4 h-4" />
                            Calculadora
                        </Button>
                    </Link>

                    <Link to="/admin">
                        <Button
                            variant={currentPage === "admin" ? "default" : "ghost"}
                            className="flex items-center gap-2"
                        >
                            <Shield className="w-4 h-4" />
                            Admin
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
