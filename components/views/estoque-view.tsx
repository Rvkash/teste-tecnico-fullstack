"use client";

import React, { useState } from 'react';
import { useEstoque } from '@/hooks/use-estoque';
import { useProdutos } from '@/hooks/use-produtos';
import { EstoqueModal } from '@/components/estoque/estoque-modal';
import { useBuscaEstoque } from '@/hooks/use-buscar';


export default function EstoqueView() {
  const [activeTab, setActiveTab] = useState<'estado' | 'historico'>('estado');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { estoque, isLoading, historico } = useEstoque();
  const { data: produtos } = useProdutos();

  const listaEstoque = estoque ?? [];
  const {
    busca,
    setBusca,
    listaFiltrada: estoqueFiltrado,
  } = useBuscaEstoque(listaEstoque);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Estoque</h1>
        <div className="mb-4">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar por nome ou SKU..."
            className="text-black border p-2 rounded-lg w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Registrar Movimentação
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('estado')}
          className={`py-2 px-4 font-medium ${activeTab === 'estado'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Estado do Estoque
        </button>
        <button
          onClick={() => setActiveTab('historico')}
          className={`py-2 px-4 font-medium ${activeTab === 'historico'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Histórico de Movimentações
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="p-10 text-center">Carregando dados...</p>
        ) : activeTab === 'estado' ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estoqueFiltrado.map((item: any) => (
                <tr key={item.id.toString()}>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.produtos?.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.produtos?.sku}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.quantidade}</td>
                  <td className="px-6 py-4">
                    {item.quantidade <= (item.produtos?.estoque_minimo || 0) ? (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Estoque Baixo</span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qtd.</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historico?.map((mov: any) => (
                <tr key={mov.id.toString()}>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(mov.criado_em).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{mov.produto_nome || mov.produtos?.nome}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${mov.tipo === 'ENTRADA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {mov.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">{mov.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <EstoqueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        produtos={produtos || []}
      />
    </div>
  );
}