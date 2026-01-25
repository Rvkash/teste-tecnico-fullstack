"use client";

import { useState } from 'react';
import { useEstoque } from '@/hooks/use-estoque';

interface EstoqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  produtos: any[];
}

export function EstoqueModal({ isOpen, onClose, produtos }: EstoqueModalProps) {
  const { registrarMovimentacao, isSubmitting } = useEstoque();

  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [tipo, setTipo] = useState<'ENTRADA' | 'SAIDA'>('ENTRADA');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!produtoId || quantidade <= 0) {
    alert("Selecione um produto e quantidade!");
    return;
  }

  try {
    const response = await fetch('/api/estoque', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produto_id: produtoId,
        quantidade: Number(quantidade),
        tipo: tipo,
        motivo: ""
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Movimentação salva com sucesso!");
      onClose();
      window.location.reload(); 
    } else {
      console.error("Erro retornado pela API:", data);
      alert("Erro da API: " + (data.error || "Erro desconhecido"));
    }
  } catch (err) {
    console.error("Erro na conexão:", err);
    alert("Erro de conexão com o servidor.");
  }
};

  console.log("Produtos no Modal:", produtos);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Nova Movimentação</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Produto
            <select
              className="border p-2 rounded text-black"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              required
            >
              <option value="">Selecione um produto...</option>
              {produtos && produtos.length > 0 ? (
                produtos.map((p: any) => (
                  <option key={p.id.toString()} value={p.id.toString()}>
                    {p.nome} {p.sku ? `- ${p.sku}` : ''}
                  </option>
                ))
              ) : (
                <option disabled>Nenhum produto encontrado</option>
              )}
            </select>
          </label>

          <label className="flex flex-col">
            Quantidade
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              className="border p-2 rounded"
              min="1"
              required
            />
          </label>

          <label className="flex flex-col">
            Tipo
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'ENTRADA' | 'SAIDA')}
              className="border p-2 rounded"
            >
              <option value="ENTRADA">Entrada (+)</option>
              <option value="SAIDA">Saída (-)</option>
            </select>
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="p-2">Cancelar</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
            >
              {isSubmitting ? 'Salvando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}