import { NextResponse } from 'next/server';
import * as EstoqueRepository from '@/repositories/estoque.repository';

export async function GET() {
  try {
    const [estoque, historico] = await Promise.all([
      EstoqueRepository.getEstoqueAtual(),
      EstoqueRepository.getHistoricoMovimentacoes()
    ]);
    
    const data = JSON.parse(JSON.stringify({ estoque, historico }, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API de estoque:", error);
    return NextResponse.json({ error: 'Erro ao buscar dados de estoque' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const resultado = await EstoqueRepository.registrarMovimentacao({
      produto_id: typeof body.produto_id === 'string' ? BigInt(body.produto_id) : BigInt(Number(body.produto_id)),
      quantidade: body.quantidade,
      tipo: body.tipo,
      observacao: body.observacao || body.motivo || ""
    });

    return NextResponse.json(resultado);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}