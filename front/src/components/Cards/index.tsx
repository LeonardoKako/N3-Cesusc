import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../Card";
import type { Item } from "../../interfaces/item";
import clsx from "clsx";

export function Cards() {
  const [produtos, setProdutos] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  async function fetchProdutos() {
    try {
      const response = await axios.get("http://localhost:3000/api/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProdutos();
  }, [refresh]);

  function handleRefresh() {
    setRefresh((prev) => !prev);
  }

  if (loading) {
    return <p className='text-center py-10'>Carregando produtos...</p>;
  }

  return (
    <section
      className={clsx(
        "px-20 py-10 flex flex-wrap justify-center",
        "gap-6 md:px-30 lg:px-40"
      )}
    >
      {produtos.map((i) => (
        <Card
          key={i.id}
          onRefresh={handleRefresh}
          item={{
            id: i.id,
            nome: i.nome,
            descricao: i.descricao,
            preco: i.preco,
            estoque: i.estoque,
            categoria_id: i.categoria_id,
            fornecedor_id: i.fornecedor_id,
          }}
        />
      ))}
    </section>
  );
}
