-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plano" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "velocidade_mbps" INTEGER NOT NULL,
    "peso_min" DOUBLE PRECISION NOT NULL,
    "peso_max" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Venda" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "plano_id" TEXT NOT NULL,
    "data_venda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gamer" BOOLEAN NOT NULL DEFAULT false,
    "celulares" INTEGER NOT NULL,
    "computadores" INTEGER NOT NULL,
    "smart_tvs" INTEGER NOT NULL,
    "tv_box" INTEGER NOT NULL,
    "outros" INTEGER NOT NULL,
    "peso_total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "public"."Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "public"."Cliente"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_cliente_id_key" ON "public"."Venda"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_plano_id_key" ON "public"."Venda"("plano_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "public"."Admin"("username");

-- AddForeignKey
ALTER TABLE "public"."Venda" ADD CONSTRAINT "Venda_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Venda" ADD CONSTRAINT "Venda_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "public"."Plano"("id") ON DELETE CASCADE ON UPDATE CASCADE;
