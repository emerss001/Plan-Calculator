export const getPlanBadgeColor = (plan: string) => {
    if (plan.includes("Bronze")) return "bg-amber-100 text-amber-800";
    if (plan.includes("Prata")) return "bg-gray-300 text-gray-900";
    if (plan.includes("Ouro")) return "bg-yellow-100 text-yellow-800";
    if (plan.includes("Diamante")) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
};
