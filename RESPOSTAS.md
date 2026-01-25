# 🧠 Reflexão Técnica - Sistema de Estoque

## 1. O que você fez?

### Correções e Implementações
* **Unificação de Dados (Normalização):** Ajustei o Repository e o Frontend para que dados vindos de fontes diferentes (Prisma ORM e SQL Puro) tivessem a mesma estrutura de objeto. Isso garantiu que o componente de tabela pudesse ler `produto.nome` e `produto.sku` de forma consistente.

* **Hook de Filtros Inteligente:** Refatorei o `useEstoqueFiltros` para realizar buscas simultâneas por Nome e SKU, utilizando `useMemo` para garantir que a interface não trave mesmo com grandes volumes de dados.
* **Resiliência da UI:** Implementei tratamentos de erro e estados de carregamento (Loading) para melhorar a experiência do usuário (UX), além de sinalizações visuais para "Estoque Baixo".

### Processo de Análise
Identifiquei que o problema de "dados que não aparecem" era uma quebra de contrato entre o Backend e o Frontend. Enquanto o banco retornava o histórico, os nomes das propriedades estavam "achatados" pelo SQL. Meu foco foi criar uma **camada de mapeamento** no Repository para que o Frontend não precisasse conhecer a complexidade do SQL, mantendo o código limpo.

## 2. O que poderia ser diferente?
* **Arquitetura de Dados:** Atualmente, o saldo de estoque é atualizado via `upsert`. Em um sistema de alta escala, poderíamos usar um padrão de **Event Sourcing**, onde o saldo é apenas uma projeção da soma de todo o histórico, garantindo 100% de auditabilidade.
* **Tipagem Estrita:** Poderíamos utilizar o **Zod** para validar os dados que chegam da API no Frontend, garantindo que qualquer mudança no banco de dados seja detectada imediatamente em tempo de desenvolvimento.

## 3. Sugestões de próximos passos
* **Exportação de Relatórios:** Geração de PDF/Excel para fechamento de inventário mensal.
* **Dashboard Analítico:** Gráficos de itens com maior saída para ajudar na tomada de decisão de compras.
* **Notificações:** Alertas automáticos via e-mail ou sistema quando um item atingir o estoque crítico.