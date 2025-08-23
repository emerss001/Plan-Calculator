import { Calendar, CheckCircle, Mail, Phone, User, Wifi } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useGetSaleDetails } from "../http/use-get-sale-details";
import { useEffect } from "react";
import Navigation from "../components/navigation";

const ResumeSalePage = () => {
    const navigate = useNavigate();
    const { saleId } = useParams();

    if (!saleId) redirect("/");
    const { mutate, data } = useGetSaleDetails();

    useEffect(() => {
        if (saleId) {
            mutate(saleId);
        }
    }, [saleId, mutate]);

    if (!data) return null;

    return (
        <>
            <Navigation />

            <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
                <div className="container mx-auto px-4 py-12 max-w-2xl">
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl flex items-center justify-center gap-3 mb-6 shadow-lg">
                            <CheckCircle className="w-6 h-6" />
                            <h1 className="text-2xl font-bold">Contrato Confirmado!</h1>
                        </div>
                    </div>

                    <Card className="gradient-card border-border/50 shadow-xl">
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                                    Parabéns!
                                </h2>
                                <p className="text-muted-foreground">Seu plano foi contratado com sucesso</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/10 rounded-xl border border-accent/20">
                                    <h3 className="font-semibold text-primary mb-4 text-lg flex items-center gap-2">
                                        <Wifi className="w-5 h-5" />
                                        Resumo do Plano
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Plano</p>
                                            <p className="font-bold text-lg text-foreground">
                                                PLANO {data?.sale.plan.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Velocidade</p>
                                            <p className="font-bold text-lg text-foreground">
                                                {data?.sale.plan.speed_mbps}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Dispositivos</p>
                                            <p className="font-bold text-lg text-foreground">
                                                {data?.sale.totalDevices} dispositivos
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Valor Mensal</p>
                                            <p className="font-bold text-2xl text-accent">
                                                {Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(Number(data?.sale.plan.price))}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-r from-muted/30 to-muted/50 rounded-xl border border-border/50">
                                    <h3 className="font-semibold text-primary mb-4 text-lg flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Dados do Contrato
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{data?.sale.client.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{data?.sale.client.telephone}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{data?.sale.client.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">
                                                Contratado em{" "}
                                                {Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
                                                    new Date(data?.sale.createdAt)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                    <p className="text-blue-800 text-center text-sm">
                                        <strong>Próximos passos:</strong> Nossa equipe entrará em contato em até 24
                                        horas para agendar a instalação.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button
                                    onClick={() => navigate("/")}
                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Finalizar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ResumeSalePage;
