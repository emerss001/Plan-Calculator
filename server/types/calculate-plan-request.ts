import z from "zod";

export const CalculePlanRequest = z.object({
    phones: z.coerce.number(),
    computers: z.coerce.number(),
    smartTvs: z.coerce.number(),
    tvBox: z.coerce.number(),
    others: z.coerce.number(),
    gamer: z.boolean(),
});
