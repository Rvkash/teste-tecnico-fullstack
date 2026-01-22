import prisma from '@/lib/db';

export const getEstoqueAtual = async () => {
  return prisma.estoque.findMany({
    include: { produto: true }
  });
};

export const getHistoricoMovimentacoes = async () => {
  return prisma.estoque_movimentacoes.findMany({
    include: { produto: true },
    orderBy: { criado_em: 'desc' }
  });
};

export const registrarMovimentacao = async (data: {
  produto_id: bigint;
  quantidade: number;
  tipo: 'ENTRADA' | 'SAIDA';
  motivo: string;
}) => {
  return await prisma.$transaction(async (tx) => {
    const mov = await tx.estoque_movimentacoes.create({ data });

    const ajuste = data.tipo === 'ENTRADA' ? data.quantidade : -data.quantidade;

    const saldo = await tx.estoque.upsert({
      where: { produto_id: data.produto_id },
      update: { quantidade: { increment: ajuste } },
      create: { produto_id: data.produto_id, quantidade: data.quantidade }
    });

    return { mov, saldo };
  });
};
