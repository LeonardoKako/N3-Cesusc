import { itemsExample } from "../../api/example";
import { Card } from "../Card";

export function Cards() {
  return (
    <section className='px-40 py-20 flex flex-wrap gap-16 justify-beetwen'>
      {itemsExample.map((i) => (
        <Card
          key={i.nome}
          nome={i.nome}
          descricao={i.descricao}
          preco={i.preco}
          quantidade_estoque={i.quantidade_estoque}
          fornecedor_id={i.fornecedor_id}
          categoria_id={i.categoria_id}
        />
      ))}
    </section>
  );
}
