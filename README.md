# Plan Calculator

Sistema completo para recomendação e gestão de planos de internet, com backend em Node.js/TypeScript e frontend em React.

## Estrutura de Pastas

```
Plan-Calculator/
├── server/        # Backend (API, banco, seed, rotas, utilitários)
│   ├── prisma/    # Migrations, seed e schema do banco
│   ├── src/       # Código-fonte principal
│   │   ├── emails/        # Templates de email
│   │   ├── erros/         # Tipos e handlers de erro
│   │   ├── lib/           # JWT, Prisma client, envio de email
│   │   ├── routes/        # Rotas da API (login, vendas, admin, etc)
│   │   ├── types/         # Tipos TypeScript compartilhados
│   │   ├── utils/         # Funções utilitárias
│   │   ├── env.ts         # Configuração de variáveis ambiente
│   │   ├── error-handler.ts # Handler global de erros
│   │   └── server.ts      # Inicialização do servidor Fastify
│   ├── package.json       # Dependências do backend
│   ├── Dockerfile         # Dockerização do backend
│   └── tsconfig.json      # Configuração TypeScript
│
├── web/           # Frontend (React + Vite)
│   ├── src/       # Código-fonte principal
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── helpers/       # Funções auxiliares
│   │   ├── http/          # Hooks de requisição à API
│   │   ├── lib/           # Utilitários e JWT
│   │   ├── pages/         # Páginas principais do app
│   │   └── index.css      # Estilos globais
│   ├── public/            # Assets públicos
│   ├── package.json       # Dependências do frontend
│   ├── Dockerfile         # Dockerização do frontend
│   └── tsconfig.json      # Configuração TypeScript
```

## Ferramentas Utilizadas

-   **Backend:**

    -   Node.js + TypeScript
    -   Fastify (API HTTP)
    -   Prisma ORM (banco de dados)
    -   PostgreSQL (banco de dados relacional)
    -   JWT para autenticação
    -   Docker para containerização
    -   Zod para validação de dados
    -   Resend para envio de emails

-   **Frontend:**
    -   React + Vite
    -   React Query para requisições
    -   React Hook Form + Zod para formulários
    -   Shadcn UI para componentes visuais
    -   Docker para containerização

## Como Executar o Projeto

Para executar o projeto basta ter o Docker instalado, toda parte de configuração já está pronta.

### Pré-requisitos

-   Node.js >= 18 (caso queira não usar o docker)
-   Docker e Docker Compose <strong>(recomendado)</strong>

### Passos

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/emerss001/Plan-Calculator.git
    cd Plan-Calculator
    ```

2. **Suba os containers com Docker Compose:**

    ```bash
    docker compose up --build -d
    ```

    Isso irá subir o banco de dados, backend e frontend.

3. **Acesse o sistema:**
    - Backend: http://localhost:3000
    - Frontend: http://localhost:5173

#### Testar upload de arquivo

-   Na raiz do projeto existe um arquivo `.xlsx`, ele pode ser usado para testar a funcionalidade de subir arquivos com vendas para o sistema.

## Observações

-   O backend expõe rotas para login, cálculo de plano, criação e upload de vendas, métricas administrativas, etc.
-   O frontend possui páginas para login, recomendação de plano, cadastro de venda, dashboard administrativo e upload de vendas via Excel.
-   O projeto está pronto para produção via Docker, mas pode ser executado localmente para desenvolvimento.

---

Para dúvidas, consulte os arquivos de cada pasta ou abra uma issue no repositório!
