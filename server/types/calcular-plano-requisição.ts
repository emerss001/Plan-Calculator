import z from "zod";

export const calcularPlanoRequisição = z.object({
    celulares: z.coerce.number(),
    computadores: z.coerce.number(),
    smartTvs: z.coerce.number(),
    tvBox: z.coerce.number(),
    outros: z.coerce.number(),
    gamer: z.boolean(),
});
