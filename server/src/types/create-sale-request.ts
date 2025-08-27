import z from "zod";

export const createSaleRequest = z.object({
    name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email(),
    telephone: z.string().min(11, "Telefone inválido").max(15, "Telefone inválido"),
    planId: z.uuid(),
    weightTotal: z.coerce.number().min(0.01, "Peso total inválido"),
    devices: z.object({
        phones: z.coerce.number(),
        computers: z.coerce.number(),
        smartTvs: z.coerce.number(),
        tvBox: z.coerce.number(),
        others: z.coerce.number(),
        gamer: z.boolean(),
    }),
});
