# 📡 Documentação da API de Estoque

A API foi construída utilizando **Next.js Route Handlers** e **Prisma ORM**.

## Endpoints

### 1. Buscar Estoque e Histórico
Retorna o saldo atual de todos os produtos e o histórico de movimentações.

* **URL:** `/api/estoque`
* **Método:** `GET`
* **Resposta de Sucesso (200 OK):**
    ```json
    {
      "estoque": [
        {
          "id": "1",
          "quantidade": 50,
          "produtos": { "nome": "Geladeira", "sku": "GEL-001" }
        }
      ],
      "historico": [
        {
          "id": "10",
          "tipo": "ENTRADA",
          "quantidade": 10,
          "produtos": { "nome": "Geladeira" }
        }
      ]
    }
    ```

### 2. Registrar Movimentação
Adiciona uma entrada ou saída no estoque.

* **URL:** `/api/estoque`
* **Método:** `POST`
* **Body:**
    ```json
    {
      "produto_id": "1",
      "quantidade": 5,
      "tipo": "ENTRADA",
      "observacao": "Reposição de estoque"
    }
    ```
* **Resposta de Sucesso (200 OK):**
    ```json
    { "success": true, "movimentacao": { ... }, "saldo": { ... } }
    ```