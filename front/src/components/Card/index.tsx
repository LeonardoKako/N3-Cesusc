import clsx from "clsx";
import type { Item } from "../../interfaces/item";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "../Form";
import { XIcon } from "lucide-react";
import axios from "axios";

const categorias = [
  { id: 1, nome: "Geladeira", emoji: "🧊", cor: "bg-blue-200" },
  { id: 2, nome: "Mercearia", emoji: "🛒", cor: "bg-yellow-200" },
  { id: 3, nome: "Hortifruti", emoji: "🥦", cor: "bg-green-200" },
  { id: 4, nome: "Açougue", emoji: "🥩", cor: "bg-red-200" },
  { id: 5, nome: "Padaria", emoji: "🥖", cor: "bg-orange-200" },
  { id: 6, nome: "Bebidas", emoji: "🍷", cor: "bg-purple-200" },
];

type CardProps = {
  item: Item;
  onRefresh: () => void;
};

export function Card({ onRefresh, item }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prevState) => !prevState);
  }

  async function handleDelete() {
    toast.dismiss();
    try {
      await axios.delete(`http://localhost:3000/api/produtos/${item.id}`);
      toast.success("Item deletado com sucesso!");
      handleToggle();
      onRefresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.erro || "Erro ao deletar item.");
    }
  }

  const categoria = categorias.find((c) => c.id === item.categoria_id);

  return (
    <>
      {!isOpen && (
        <div className='w-[80%] md:w-60 min-h-60 bg-white shadow-2xl rounded-2xl hover:scale-105 transition p-5 flex flex-col justify-between mb-6'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-semibold text-lg'>{item.nome}</h1>

            <div
              className={`px-2 py-1 ${categoria?.cor} rounded-md flex justify-between text-sm w-full max-w-30`}
            >
              <p>{categoria?.nome}</p>
              <span>{categoria?.emoji}</span>
            </div>

            <p className='text-slate-600 text-sm'>{item.descricao}</p>
            <p>
              Preço: <span className='font-bold'>R${item.preco}</span>
            </p>
            <p>
              Quantidade em estoque:{" "}
              <span className='font-bold'>{item.estoque}</span>
            </p>
          </div>
          <button
            type='button'
            className={clsx(
              "px-4 py-2 bg-blue-400 mt-3 rounded-2xl w-full",
              "cursor-pointer transition hover:bg-blue-500",
              "text-white font-bold text-lg"
            )}
            onClick={handleToggle}
          >
            Editar
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-10'
          onClick={handleToggle}
        >
          <div
            className='bg-white w-[560px] h-[480px] rounded-lg shadow-xl z-20 p-5 flex flex-col justify-between'
            onClick={(e) => e.stopPropagation()}
          >
            <header className='flex flex-col'>
              <div className='flex justify-between'>
                <h1 className='font-semibold text-lg'>Edição de item</h1>
                <span className='cursor-pointer' onClick={handleToggle}>
                  <XIcon />
                </span>
              </div>
              <div className='w-full h-0.5 bg-black mt-1.5'></div>
            </header>

            <Form
              item={item}
              handleToggle={handleToggle}
              onRefresh={onRefresh}
            />

            <button
              type='button'
              className={clsx(
                "px-4 py-2 bg-red-400 mt-3 rounded-2xl w-full",
                "cursor-pointer transition hover:bg-red-500",
                "text-white font-bold text-lg"
              )}
              onClick={handleDelete}
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
