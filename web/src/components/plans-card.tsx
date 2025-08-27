const PlansCard = () => {
    const plans = [
        { name: "BRONZE", speed: "300Mb", price: 99.99, color: "bg-amber-600", description: "Ideal para uso básico" },
        { name: "PRATA", speed: "100Mb", price: 149.99, color: "bg-gray-400", description: "Perfeito para famílias" },
        { name: "OURO", speed: "500Mb", price: 199.99, color: "bg-yellow-500", description: "Para uso intensivo" },
        { name: "DIAMANTE", speed: "800Mb", price: 299.99, color: "bg-blue-600", description: "Máxima velocidade" },
    ];

    return (
        <div className="mt-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2">Todos os Planos Disponíveis</h2>
                <p className="text-muted-foreground text-lg">Compare e escolha o melhor para você</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="device-card p-6 rounded-2xl border-2 transition-all duration-300 border-border bg-card hover:border-accent/50"
                    >
                        <div className="text-center space-y-3">
                            <div className={`w-6 h-6 ${plan.color} rounded-full mx-auto shadow-sm`}></div>
                            <div>
                                <h4 className="font-bold text-lg text-foreground">{plan.name}</h4>
                                <p className="text-muted-foreground">{plan.speed}</p>
                            </div>
                            <p className="text-2xl font-bold text-primary">R$ {plan.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlansCard;
