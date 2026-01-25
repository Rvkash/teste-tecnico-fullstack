'use client';

import { CategoriasView } from "@/components/views/categorias-view";
import { ProdutosView } from "@/components/views/produtos-view";
import EstoqueView from "@/components/views/estoque-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Verifique se o caminho do seu UI Tabs é este

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Tabs defaultValue="categorias" className="w-full max-w-5xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
        </TabsList>

        <TabsContent value="categorias">
          <CategoriasView />
        </TabsContent>

        <TabsContent value="produtos">
          <ProdutosView />
        </TabsContent>

        <TabsContent value="estoque">
          <EstoqueView />
        </TabsContent>
      </Tabs>
    </main>
  );
}