import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchEstoque = async () => {
  const response = await fetch('/api/estoque');
  const data = await response.json();
  return data;
};

async function postMovimentacao(data: any) {
  const response = await fetch('/api/estoque', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || 'Erro ao registrar movimentação');
  }

  return response.json();
}

export const useEstoque = () => {
  const queryClient = useQueryClient();

  const estoqueQuery = useQuery({
    queryKey: ['estoque'],
    queryFn: fetchEstoque,
  });

  const movimentacaoMutation = useMutation({
    mutationFn: postMovimentacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estoque'] });
    },
  });

  return {
    estoque: estoqueQuery.data?.estoque,
    historico: estoqueQuery.data?.historico,
    isLoading: estoqueQuery.isLoading,
    isError: estoqueQuery.isError,
    registrarMovimentacao: movimentacaoMutation.mutate,
    isSubmitting: movimentacaoMutation.isPending,
  };
};