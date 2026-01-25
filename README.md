<p align="center">
  <img src="./assets/img.png/badge/Next.js-15%2B-black?logo=next.js)]
  (https://nextjs.org/)

📦 Inventory Manager | Teste Técnico Fullstack
Sistema de gerenciamento de entrada e saida de estoque, Desenvolvido para facilitar o controle de entradas, saídas e monitoramento de estoque crítico.

(Teste Técnico Para FullStack Júnior)

🚀 Tecnologias Utilizadas
Framework: Next.js (App Router)

Estilização: Tailwind CSS

Banco de Dados: PostgreSQL / Prisma ORM

Linguagem: TypeScript

⚙️ Configuração Inicial
Siga os passos abaixo para rodar o projeto localmente em sua máquina.

1. Clonar o Repositório
Bash
git clone https://github.com/rvkash/teste-tecnico-fullstack.git
cd teste-tecnico-fullstack
2. Instalar Dependências
Bash
npm install
3. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e configure sua string de conexão:

Snippet de código
DATABASE_URL="postgresql://usuario:senha@localhost:5432/estoque"
4. Sincronizar Banco de Dados
Bash
npx prisma db push
5. Iniciar Servidor de Desenvolvimento
Bash
npm run dev
Acesse: http://localhost:3000

📖 Guia de Uso
📊 Painel: Estado do Estoque
Monitoramento em Tempo Real: Visualize o saldo atualizado de cada item.

Alertas Inteligentes: Itens abaixo do estoque mínimo recebem automaticamente a tag ⚠️ Estoque Baixo.

Filtros Rápidos: Busca otimizada por Nome ou SKU.

🕒 Histórico de Movimentações
Rastreabilidade: Log completo de todas as entradas e saídas.

Auditoria: Verifique datas, quantidades e os motivos de cada alteração no estoque.

🔄 Registrar Movimentação
Clique no botão + Registrar Movimentação.

Selecione o produto desejado.

Escolha o tipo: Entrada (Reposição) ou Saída (Venda/Baixa).

Informe a quantidade e confirme. O saldo é recalculado instantaneamente.

🛠️ Estrutura de Pastas (Opcional)
Dica: Adicione isso se quiser impressionar no teste técnico.

/app: Rotas e componentes de página (Next.js App Router).

/prisma: Schema e configurações do banco de dados.

/components: Componentes reutilizáveis (UI).

Repositorio original: https://github.com/Plansul/junior-technical-assessment

Feito com 💜 Rafael Linhares