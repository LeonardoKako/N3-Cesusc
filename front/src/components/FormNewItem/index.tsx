import clsx from "clsx";
import { toast } from "react-toastify";
import { Input } from "../Input";
import type { FormEvent } from "react";

type FormNewItemProps = {
  handleToggle: () => void;
};

export function FormNewItem({ handleToggle }: FormNewItemProps) {
  function handleSubmitNewItem(e: FormEvent) {
    e.preventDefault();
    handleToggle();
    toast.dismiss();
    toast.success("Item criado");
  }
  return (
    <form onSubmit={handleSubmitNewItem} className='flex flex-col gap-3.5'>
      <Input
        id='name'
        title='Nome'
        type='text'
        placeholder='Digite o nome do item'
      />
      <Input
        id='description'
        title='Descrição'
        type='text'
        placeholder='Digite a descrição do item'
      />
      <div className='flex justify-start gap-5'>
        <Input id='price' title='Preço' type='number' />
        <Input id='qtde' title='Quantidade em estoque' type='number' />
      </div>
      <div className='flex items-center gap-2'>
        <label htmlFor='category' className='font-semibold w-[25%]'>
          Categoria:
        </label>
        <select
          id='category'
          className='w-[75%] px-2.5 py-1.5 text-base text-gray-700
                bg-white border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               '
        >
          <option value='gel'>Geladeira</option>
          <option value='horti'>Horti Fruti</option>
          <option value='merc'>Mercearia</option>
        </select>
      </div>
      <div className='flex items-center gap-2'>
        <label htmlFor='supplier' className='font-semibold  w-[25%]'>
          Fornecedor:
        </label>
        <select
          id='supplier'
          className='w-[75%] px-2.5 py-1.5 text-base text-gray-700
                bg-white border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               '
        >
          <option value='g1'>Grupo 1</option>
          <option value='g2'>Grupo 2</option>
          <option value='g3'>Grupo 3</option>
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
