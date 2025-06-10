import clsx from "clsx";
import type { Item } from "../../interfaces/item";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "../Form";
import { XIcon } from "lucide-react";

export function Card(item: Item) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prevState) => !prevState);
    console.log("toggle");
  }

  function HandleCancel() {
    handleToggle();
    toast.dismiss();
    toast.error("Edição de item cancelada");
  }

  return (
    <>
      {!isOpen && (
        <div className='w-60 h-60 bg-white shadow-2xl rounded-2xl hover:scale-105 transition p-5 flex flex-col justify-between'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-semibold text-lg'>{item.nome}</h1>
            <div className='px-2 py-1 bg-slate-200 rounded-2xl flex items-center text-sm w-full max-w-30'>
              {item.categoria_id}
            </div>
            <p className='text-slate-600 text-sm'>{item.descricao}</p>
            <p>
              Preço: <span className='font-bold'>R${item.preco},00</span>
            </p>
            <p>
              Quantidade em estoque:{" "}
              <span className='font-bold'>{item.quantidade_estoque}</span>
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
        <>
          {/* Overlay */}
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
                  <h1 className='font-semibold text-lg'>Criação de item</h1>
                  <span className='cursor-pointer' onClick={handleToggle}>
                    <XIcon />
                  </span>
                </div>
                <div className='w-full h-0.5 bg-black mt-1.5'></div>
              </header>
              <Form item={item} handleToggle={handleToggle} />
              <button
                type='button'
                className={clsx(
                  "px-4 py-2 bg-red-400 mt-3 rounded-2xl w-full",
                  "cursor-pointer transition hover:bg-red-500",
                  "text-white font-bold text-lg"
                )}
                onClick={HandleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
