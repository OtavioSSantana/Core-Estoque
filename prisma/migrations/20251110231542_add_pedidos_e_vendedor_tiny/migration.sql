-- CreateTable
CREATE TABLE "lojas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80),
    "endereco" TEXT,
    "gerente" INTEGER,
    "qtd_total_prod" INTEGER,

    CONSTRAINT "lojas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(60) NOT NULL,
    "descricao" TEXT,
    "fornecedor" VARCHAR(80),
    "preco_venda" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60),

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque_loja" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "loja_id" INTEGER NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL DEFAULT 0,
    "quantidade_mostruario" INTEGER NOT NULL DEFAULT 0,
    "quantidade_disponivel" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "estoque_loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50),
    "login" VARCHAR(40),
    "senha" INTEGER,
    "setor" INTEGER,
    "loja" INTEGER,
    "inativo" BOOLEAN DEFAULT false,
    "email" TEXT,
    "id_vendedor_tiny" VARCHAR(50),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "codigo_tiny" VARCHAR(100),
    "numero" VARCHAR(50),
    "data_pedido" TIMESTAMP(3),
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(50),
    "cliente_nome" VARCHAR(200),
    "valor_total" DECIMAL(18,2),
    "id_vendedor" VARCHAR(50),
    "nome_vendedor" VARCHAR(200),
    "situacao" VARCHAR(100),
    "loja_id" INTEGER,
    "sincronizado_em" TIMESTAMP(3),
    "estoque_baixado" BOOLEAN NOT NULL DEFAULT false,
    "estoque_baixado_em" TIMESTAMP(3),

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_pedido" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER,
    "codigo_produto_tiny" VARCHAR(100),
    "descricao" VARCHAR(500),
    "quantidade" DECIMAL(18,2) NOT NULL,
    "valor_unitario" DECIMAL(18,2) NOT NULL,
    "valor_total" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "itens_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_codigo_key" ON "produtos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "estoque_loja_produto_id_loja_id_key" ON "estoque_loja"("produto_id", "loja_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_vendedor_tiny_key" ON "usuarios"("id_vendedor_tiny");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_codigo_tiny_key" ON "pedidos"("codigo_tiny");

-- CreateIndex
CREATE INDEX "pedidos_codigo_tiny_idx" ON "pedidos"("codigo_tiny");

-- CreateIndex
CREATE INDEX "pedidos_status_idx" ON "pedidos"("status");

-- CreateIndex
CREATE INDEX "pedidos_data_pedido_idx" ON "pedidos"("data_pedido");

-- CreateIndex
CREATE INDEX "pedidos_situacao_idx" ON "pedidos"("situacao");

-- CreateIndex
CREATE INDEX "pedidos_estoque_baixado_idx" ON "pedidos"("estoque_baixado");

-- CreateIndex
CREATE INDEX "itens_pedido_pedido_id_idx" ON "itens_pedido"("pedido_id");

-- CreateIndex
CREATE INDEX "itens_pedido_produto_id_idx" ON "itens_pedido"("produto_id");

-- CreateIndex
CREATE INDEX "itens_pedido_codigo_produto_tiny_idx" ON "itens_pedido"("codigo_produto_tiny");

-- AddForeignKey
ALTER TABLE "estoque_loja" ADD CONSTRAINT "estoque_loja_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_loja" ADD CONSTRAINT "estoque_loja_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
