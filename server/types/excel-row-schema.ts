import z from "zod";

export const excelRowSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    "E-mail": z.string().optional(),
    telefone: z.string().optional(),
    Celulares: z.coerce.number().min(0).default(0),
    Computadores: z.coerce.number().min(0).default(0),
    "Smart TV": z.coerce.number().min(0).default(0),
    "Tv box": z.coerce.number().min(0).default(0),
    "Outros dispositivos": z.coerce.number().min(0).default(0),
    "Cliente Gamer": z
        .union([z.boolean(), z.string()])
        .transform((val) => {
            if (typeof val === "boolean") return val;
            return val === "true" || val === "1" || val === "sim" || val === "SIM";
        })
        .default(false),
});

export type ExcelRow = z.infer<typeof excelRowSchema>;
