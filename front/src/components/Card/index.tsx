import clsx from "clsx";

export function Card() {
  return (
    <div className='w-60 h-60 bg-white shadow-2xl rounded-2xl hover:scale-105 transition p-5'>
      <div className='flex gap-2'>
        <h1 className='font-semibold text-lg'>Nome item</h1>
        <div className='px-2 py-1 bg-slate-200 rounded-2xl flex items-center text-sm'>
          🧊 Geladeira
        </div>
      </div>
      <p className='text-slate-600 text-sm mt-3'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quibusdam
        iusto?
      </p>
      <div className='flex justify-between mt-3'>
        <p>
          Preço: <span className='font-bold'>R$50,00</span>
        </p>
        <p>
          Qtde: <span className='font-bold'>20</span>
        </p>
      </div>
      <button
        type='button'
        className={clsx(
          "px-4 py-2 bg-blue-400 mt-3 rounded-2xl w-full",
          "cursor-pointer transition hover:bg-blue-500",
          "text-white font-bold text-lg"
        )}
      >
        Editar
      </button>
    </div>
  );
}
