import prisma from '@/lib/db';

export const getEstoqueAtual = async () => {
  return prisma.estoque.findMany({ include: { produtos: true } });
};

export const getHistoricoMovimentacoes = async () => {
  try {
    const dados: any[] = await prisma.$queryRawUnsafe(`
      SELECT 
        m.id, 
        m.produto_id, 
        m.quantidade, 
        m.tipo, 
        m.motivo, 
        m.criado_em,
        p.nome as p_nome,
        p.sku as p_sku
      FROM estoque_movimentacoes m
      LEFT JOIN produtos p ON m.produto_id = p.id
      ORDER BY m.criado_em DESC
    `);

    console.log(">>> DADOS BRUTOS DO BANCO:", dados.length, "itens encontrados");

    const normalizado = dados.map(item => ({
      ...item,
      criado_em: item.criado_em,
      produtos: {
        nome: item.p_nome || "Produto não identificado",
        sku: item.p_sku || ""
      }
    }));

    return JSON.parse(
      JSON.stringify(normalizado, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
  } catch (error) {
    console.error("ERRO CRÍTICO NO SQL DO HISTÓRICO:", error);
    return [];
  }
};

export const registrarMovimentacao = async (data: any) => {
  return prisma.$transaction(async (tx) => {
    const pId = Number(data.produto_id);
    const qtd = Number(data.quantidade);
    const motivo = data.observacao || data.motivo || "";


    await tx.$executeRawUnsafe(
      `INSERT INTO "estoque_movimentacoes" (produto_id, quantidade, tipo, motivo) 
       VALUES ($1, $2, $3, $4)`,
      pId, qtd, data.tipo, motivo
    );

    const fator = data.tipo === 'ENTRADA' ? 1 : -1;
    const valorAlteracao = qtd * fator;

    const saldo = await tx.estoque.upsert({
      where: { produto_id: BigInt(pId) },
      update: {
        quantidade: { increment: valorAlteracao }
      },
      create: {
        produto_id: BigInt(pId),
        quantidade: valorAlteracao
      },
    });

    return {
      success: true,
      movimentacao: { tipo: data.tipo, quantidade: qtd },
      saldo: JSON.parse(JSON.stringify(saldo, (k, v) => typeof v === 'bigint' ? v.toString() : v))
    };
  });
};