import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { calculePlanRoute } from "./routes/calculate-plan-route.ts";
import fastifyMultipart from "@fastify/multipart";
import { createSaleRoute } from "./routes/create-sale-route.ts";
import { uploadSalesRoute } from "./routes/upload-sales-route.ts";

// Inicializa a aplicação Fastify com suporte ao Zod para validação de tipos
const app = fastify().withTypeProvider<ZodTypeProvider>();

// Configura o CORS permitindo acesso do frontend local
app.register(fastifyCors, {
    // origin: "http://localhost:3001",
    origin: "*",
});

app.register(fastifyMultipart);

// Define os compiladores de validação e serialização usando Zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Define a rota de verificação de saúde
app.get("/health", async () => {
    return { status: "ok" };
});

// Registra a rota de cálculo de plano
app.register(calculePlanRoute);

// Registra a rota de criação de venda
app.register(createSaleRoute);

app.register(uploadSalesRoute);

// Inicia o servidor
app.listen({ port: env.PORT }).then(() => {
    console.log("Servidor rodando na porta 3000!");
});
