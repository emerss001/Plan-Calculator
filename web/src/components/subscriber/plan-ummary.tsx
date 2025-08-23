interface DetailsPlanSubscription {
    id: string;
    name: string;
    speed: number;
    price: number;
    totalDevices: number;
}

interface PlanSelected {
    plan: DetailsPlanSubscription;
}

const PlanSummary = ({ plan }: PlanSelected) => {
    return (
        <div className="mb-8 p-6 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl border border-accent/20">
            <h3 className="font-semibold text-primary mb-4 text-lg">Plano Selecionado:</h3>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-xl text-foreground">PLANO {plan.name.toUpperCase()}</p>
                    <p className="text-muted-foreground">
                        {plan.speed} MBs - {plan.totalDevices} dispositivos
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-accent">
                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(plan.price)}
                    </p>
                    <p className="text-sm text-muted-foreground">mensal</p>
                </div>
            </div>
        </div>
    );
};

export default PlanSummary;
