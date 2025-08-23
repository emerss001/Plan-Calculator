import z from "zod";
import Navigation from "../components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useLogin, type LoginError } from "../http/use-login";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    username: z.string().min(3, "O nome de usuário deve ter no mínimo 3 caracteres"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof formSchema>;

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = useLogin();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function handleFormSubmit(data: LoginFormData) {
        setIsLoading(true);
        setError("");

        mutate(data, {
            onSuccess: (response) => {
                localStorage.setItem("token", response.token);
                navigate("/admin");
            },
            onError: (error: LoginError) => {
                setError(error.message);
            },
            onSettled: () => {
                setIsLoading(false);
            },
        });
    }

    return (
        <>
            <Navigation currentPage="admin" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5G4FTTEW1L51vrKfSAfylmTirYbI6O.png"
                                alt="MICKS FIBRA"
                                width={60}
                                height={40}
                                className="brightness-0 invert"
                            />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Painel Administrativo
                        </h1>
                        <p className="text-gray-600 mt-2">Faça login para acessar o dashboard</p>
                    </div>

                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-xl text-center text-gray-800">
                                Informe suas credenciais
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form className="space-y-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome de usuário</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                                            placeholder="Digite seu usuário"
                                                            {...field}
                                                            type="text"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome de usuário</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                                            placeholder="Digite sua senha"
                                                            {...field}
                                                            type={showPassword ? "text" : "password"}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="w-4 h-4" />
                                                            ) : (
                                                                <Eye className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {error && (
                                        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                            <p className="text-sm text-red-600">{error}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {isLoading ? "Entrando..." : "Entrar"}
                                    </Button>
                                </form>
                            </Form>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-700 font-medium mb-1">Credenciais de demonstração:</p>
                                <p className="text-xs text-blue-600">Usuário: admin</p>
                                <p className="text-xs text-blue-600">Senha: desafio</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
