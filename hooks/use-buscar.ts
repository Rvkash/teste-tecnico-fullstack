"use client";

import { useMemo, useState } from "react";

export function useBuscaEstoque(lista: any[]) {
  const [busca, setBusca] = useState("");

  const listaFiltrada = useMemo(() => {
    if (!busca) return lista;

    const termo = busca.toLowerCase();

    return lista.filter((item) => {
      const nome =
        item.produtos?.nome ||
        item.produto_nome ||
        item.nome ||
        "";

      const sku =
        item.produtos?.sku ||
        item.produto_sku ||
        item.sku ||
        "";

      return (
        nome.toLowerCase().includes(termo) ||
        sku.toLowerCase().includes(termo)
      );
    });
  }, [busca, lista]);

  return {
    busca,
    setBusca,
    listaFiltrada,
  };
}
