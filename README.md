# 📦 Logistics App

Projeto inicial e experimental que demonstra, de forma prática, o funcionamento de um sistema de gerenciamento logístico para controle das movimentações de entrada (Inbound) e saída (Outbound) de produtos.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Drizzle ORM** - ORM para PostgreSQL
- **Neon Database** - PostgreSQL serverless
- **NextAuth.js** - Autenticação
- **React Hook Form + Zod** - Validação de formulários

## 📋 Funcionalidades

### Autenticação
- Login com [NextAuth.js](https://authjs.dev/reference/nextjs)
- Proteção de rotas privadas

### Dashboard
- Visualização de todas as movimentações registradas
- Listagem com informações de origem, destino e data
- Edição e exclusão de registros

### Registro de Movimentações
- Cadastro de operações Inbound (entrada) e Outbound (saída)
- Seleção de local de origem e destino
- Registro de múltiplos produtos por movimentação
- Validação de dados com Zod

## 🛠️ Como Clonar e Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd logistics-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL=<sua-connection-string-postgresql>
AUTH_SECRET=<sua-chave-secreta>
AUTH_URL=http://localhost:3000/api/auth
```

4. **Execute as migrações do banco de dados**

Domentação do [Drizzle](https://orm.drizzle.team/docs/get-started/neon-new)
```bash
npx drizzle-kit push
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

6. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
logistics-app/
├── app/                   # Rotas e páginas Next.js
│   ├── (private)/         # Rotas protegidas
│   │   └── dashboard/     # Dashboard principal
│   └── login/             # Página de login
├── components/            # Componentes React
│   ├── auth/              # Componentes de autenticação
│   ├── layout/            # Formulários e layouts
│   └── ui/                # Componentes de interface
├── db/                    # Configuração do banco de dados
│   └── schema/            # Schemas Drizzle
├── lib/                   # Funções utilitárias
│   ├── actions.ts         # Server actions
│   └── authenticate.ts    # Lógica de autenticação
└── migrations/            # Migrações do banco de dados
```

## 🔐 Autenticação

O sistema utiliza NextAuth.js para autenticação. Para fazer login, você precisa ter um usuário cadastrado no banco de dados.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com Drizzle ORM. As principais tabelas são:

- **users** - Usuários do sistema
- **registers** - Registros de movimentações
- **register_products** - Produtos vinculados às movimentações
- **products** - Catálogo de produtos

## 📄 Licença

Este projeto é privado.
