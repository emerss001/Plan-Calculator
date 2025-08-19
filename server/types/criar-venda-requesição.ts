import z from "zod";

export const criarVendaRequisição = z.object({
    nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email(),
    telefone: z.string().min(11, "Telefone inválido").max(13, "Telefone inválido"),
    planoId: z.uuid(),
    pesoTotal: z.coerce.number().min(0.01, "Peso total inválido"),
    dispositivos: z.object({
        celulares: z.coerce.number(),
        computadores: z.coerce.number(),
        smartTvs: z.coerce.number(),
        tvBox: z.coerce.number(),
        outros: z.coerce.number(),
        gamer: z.boolean(),
    }),
});
