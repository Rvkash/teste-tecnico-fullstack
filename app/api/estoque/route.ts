import { NextResponse } from 'next/server';
import * as repo from '@/repositories/estoque.repository';

// GET para listar o estoque e histórico
export async function GET() {
  try {
    const estoque = await repo.getEstoqueAtual();
    const historico = await repo.getHistoricoMovimentacoes();
    
    // Serializando BigInt para não dar erro 500 novamente!
    const data = JSON.parse(JSON.stringify({ estoque, historico }, (k, v) => 
      typeof v === 'bigint' ? v.toString() : v
    ));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}

// POST para criar nova movimentação
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await repo.registrarMovimentacao({
      produto_id: BigInt(body.produto_id),
      quantidade: Number(body.quantidade),
      tipo: body.tipo,
      motivo: body.motivo
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar' }, { status: 400 });
  }
}