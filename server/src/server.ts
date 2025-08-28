import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { calculePlanRoute } from "./routes/calculate-plan-route.ts";
import fastifyMultipart from "@fastify/multipart";
import { createSaleRoute } from "./routes/create-sale-route.ts";
import { uploadSalesRoute } from "./routes/admin/upload-sales-route.ts";
import { jwtPlugin } from "./lib/jwt.ts";
import { loginRoute } from "./routes/login-route.ts";
import { getSalesAdminRoute } from "./routes/admin/get-sales-admin-route.ts";
import { getSaleDetails } from "./routes/get-sale-details.ts";
import { getMetricsAdmin } from "./routes/admin/get-metrics-admin.ts";
import { getSalesFilteredRoute } from "./routes/admin/get-sales-filtered-route.ts";
import { confirmSaleRoute } from "./routes/admin/confirm-sale.ts";
import { errorHandler } from "./error-handler.ts";

// Inicializa a aplicação Fastify com suporte ao Zod para validação de tipos
const app = fastify().withTypeProvider<ZodTypeProvider>();

// Registra o plugin JWT para autenticação
jwtPlugin(app);

// Configura o CORS permitindo acesso do frontend local
app.register(fastifyCors, {
    origin: "*",
    credentials: false,
});

// Registra o plugin de upload de arquivos
app.register(fastifyMultipart);

// Define os compiladores de validação e serialização usando Zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

// Define a rota de verificação de saúde
app.get("/health", async () => {
    return { status: "ok" };
});

// Definição das rotas da aplicação
app.register(loginRoute);
app.register(calculePlanRoute);
app.register(createSaleRoute);
app.register(uploadSalesRoute);
app.register(getSaleDetails);

app.register(getSalesAdminRoute);
app.register(getMetricsAdmin);
app.register(getSalesFilteredRoute);
app.register(confirmSaleRoute);

// Inicia o servidor
app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
    console.log("Servidor rodando na porta 3000!");
});
