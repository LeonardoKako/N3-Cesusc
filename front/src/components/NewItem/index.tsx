import clsx from "clsx";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormNewItem } from "../FormNewItem";

export function NewItem() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prevState) => !prevState);
    console.log("toggle");
  }

  function HandleCancel() {
    handleToggle();
    toast.dismiss();
    toast.error("Criação de item cancelada");
  }

  return (
    <>
      {!isOpen && (
        <div
          className={clsx(
            "w-25 h-25 bg-blue-600 rounded-4xl",
            " hover:scale-105 transition cursor-pointer",
            "fixed bottom-12 right-12",
            "flex items-center justify-center",
            "text-white hover:bg-blue-700"
          )}
          onClick={handleToggle}
        >
          <PlusIcon size={60} />
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
              <FormNewItem handleToggle={handleToggle} />
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
