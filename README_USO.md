# 🚀 Guia de Uso - Sistema de Estoque

Este projeto é um gerenciador de inventário desenvolvido com **Next.js 16**, **Tailwind CSS** e **PRISMA ORM**.

## ⚙️ Configuração Inicial

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Rvkash/teste-tecnico-fullstack
.git](https://github.com/seu-usuario/projeto-estoque.git)
Instale as dependências:

Bash
npm install
Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz e adicione sua string de conexão:

Snippet de código
DATABASE_URL="postgresql://usuario:senha@localhost:5432/estoque"
Sincronize o Banco de Dados:

Bash
npx prisma db push
Inicie o projeto:

Bash
npm run dev
📖 Como utilizar
Aba "Estado do Estoque"
Visualize o saldo atual de cada produto.

Itens com quantidade abaixo do estoque mínimo serão destacados com a tag "Estoque Baixo".

Use a barra de busca para filtrar por Nome ou SKU.

Aba "Histórico"
Acompanhe todas as entradas e saídas registradas.

Verifique a data e o motivo de cada movimentação.

Registrar Movimentação
Clique no botão "+ Registrar Movimentação".

Selecione o produto.

Escolha o tipo (Entrada para adicionar, Saída para remover).

Informe a quantidade e confirme. O saldo será atualizado automaticamente.