import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { calcularPlano } from "./routes/calcular-plano.ts";

// Inicializa a aplicação Fastify com suporte ao Zod para validação de tipos
const app = fastify().withTypeProvider<ZodTypeProvider>();

// Configura o CORS permitindo acesso do frontend local
app.register(fastifyCors, {
    // origin: "http://localhost:3001",
    origin: "*",
});

// Define os compiladores de validação e serialização usando Zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Define a rota de verificação de saúde
app.get("/health", async () => {
    return { status: "ok" };
});

// Registra a rota de cálculo de plano
app.register(calcularPlano);

// Inicia o servidor
app.listen({ port: env.PORT }).then(() => {
    console.log("Servidor rodando na porta 3000!");
});
