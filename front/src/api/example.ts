import type { Item } from "../interfaces/item";

export const itemsExample: Item[] = [];

export const itemExample: Item = {
  nome: "Banana prata",
  descricao: "Banana prata em boa condição",
  preco: 10,
  quantidade_estoque: 55,
  categoria_id: 2,
  fornecedor_id: 1,
};

itemsExample.push(itemExample);
