import clsx from "clsx";
import { toast } from "react-toastify";
import { Input } from "../Input";
import { useState, type FormEvent } from "react";
import type { Item } from "../../interfaces/item";
import axios from "axios";

type FormProps = {
  handleToggle: () => void;
  item?: Item;
  onRefresh: () => void;
};

const categorias = [
  { id: 1, nome: "Geladeira 🧊" },
  { id: 2, nome: "Mercearia 🛒" },
  { id: 3, nome: "Hortifruti 🥦" },
  { id: 4, nome: "Açougue 🥩" },
  { id: 5, nome: "Padaria 🥖" },
  { id: 6, nome: "Bebidas 🍷" },
];

const fornecedores = [
  { id: 1, nome: "Fornecedor A" },
  { id: 2, nome: "Fornecedor B" },
  { id: 3, nome: "Fornecedor C" },
];

export function Form({ handleToggle, item, onRefresh }: FormProps) {
  const [nome, setNome] = useState(item?.nome || "");
  const [descricao, setDescricao] = useState(item?.descricao || "");
  const [preco, setPreco] = useState(item?.preco || 0);
  const [qtdeEstoque, setQtdeEstoque] = useState(item?.estoque || 0);
  const [categoriaId, setCategoriaId] = useState(
    item?.categoria_id || categorias[0]?.id || 0
  );
  const [fornecedorId, setFornecedorId] = useState(
    item?.fornecedor_id || fornecedores[0]?.id || 0
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    toast.dismiss();

    if (nome === "")
      return toast.error("Por favor, informe o nome do produto.");
    if (descricao === "")
      return toast.error("Por favor, informe a descrição do produto.");
    if (preco <= 0) return toast.error("O preço deve ser maior que zero.");
    if (qtdeEstoque < 0)
      return toast.error("A quantidade em estoque não pode ser negativa.");

    const payload = {
      nome,
      descricao,
      preco,
      estoque: qtdeEstoque,
      categoria_id: categoriaId,
      fornecedor_id: fornecedorId,
    };

    if (!item) {
      // Criar novo produto
      await axios.post("http://localhost:3000/api/produtos", payload);
      toast.success("Item criado com sucesso!");
      handleToggle();
      onRefresh();
    }
    if (item) {
      // Atualizar produto existente
      await axios.put(`http://localhost:3000/api/produtos/${item.id}`, payload);
      toast.success("Item atualizado com sucesso!");
      handleToggle();
      onRefresh();
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3.5'>
      <Input
        id='name'
        title='Nome'
        type='text'
        placeholder='Digite o nome do item'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Input
        id='description'
        title='Descrição'
        type='text'
        placeholder='Digite a descrição do item'
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <div className='flex justify-start gap-5'>
        <Input
          id='price'
          title='Preço'
          type='number'
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
        <Input
          id='qtde'
          title='Quantidade em estoque'
          type='number'
          value={qtdeEstoque}
          onChange={(e) => setQtdeEstoque(Number(e.target.value))}
        />
      </div>
      <div className='flex items-center gap-2'>
        <label htmlFor='category' className='font-semibold w-[25%]'>
          Categoria:
        </label>
        <select
          id='category'
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          className='w-[75%] px-2.5 py-1.5 text-base text-gray-700
                bg-white border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      <div className='flex items-center gap-2'>
        <label htmlFor='supplier' className='font-semibold w-[25%]'>
          Fornecedor:
        </label>
        <select
          id='supplier'
          value={fornecedorId}
          onChange={(e) => setFornecedorId(Number(e.target.value))}
          className='w-[75%] px-2.5 py-1.5 text-base text-gray-700
                bg-white border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.nome}
            </option>
          ))}
        </select>
      </div>
      <button
        type='submit'
        className={clsx(
          "px-4 py-2 bg-green-400 mt-3 rounded-2xl w-full",
          "cursor-pointer transition hover:bg-green-500",
          "text-white font-bold text-lg"
        )}
      >
        Confirmar
      </button>
    </form>
  );
}
