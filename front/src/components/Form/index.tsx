import clsx from "clsx";
import { toast } from "react-toastify";
import { Input } from "../Input";
import { useState, type FormEvent } from "react";
import type { Item } from "../../interfaces/item";

type FormProps = {
  handleToggle: () => void;
  item?: Item;
};

const categorias = [
  { id: 1, nome: "Geladeira" },
  { id: 2, nome: "Horti Fruti" },
  { id: 3, nome: "Mercearia" },
];

const fornecedores = [
  { id: 1, nome: "Fornecedor A" },
  { id: 2, nome: "Fornecedor B" },
  { id: 3, nome: "Fornecedor C" },
];

export function Form({ handleToggle, item }: FormProps) {
  const [nome, setNome] = useState(item?.nome || "");
  const [descricao, setDescricao] = useState(item?.descricao || "");
  const [preco, setPreco] = useState(item?.preco || 0);
  const [qtdeEstoque, setQtdeEstoque] = useState(item?.quantidade_estoque || 0);
  const [categoriaId, setCategoriaId] = useState(
    item?.categoria_id || categorias[0]?.id || 0
  );
  const [fornecedorId, setFornecedorId] = useState(
    item?.fornecedor_id || fornecedores[0]?.id || 0
  );

  function handleSubmitNewItem(e: FormEvent) {
    e.preventDefault();
    handleToggle();
    toast.dismiss();
    toast.success("Item criado");

    // Aqui você pode usar os valores dos estados, incluindo:
    // categoriaId e fornecedorId que agora são numéricos
    console.log({
      nome,
      descricao,
      preco,
      qtdeEstoque,
      categoriaId,
      fornecedorId,
    });
  }

  return (
    <form onSubmit={handleSubmitNewItem} className='flex flex-col gap-3.5'>
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
