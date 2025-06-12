import clsx from "clsx";

type InputProps = {
  title: string;
  type: "number" | "text";
  id: string;
  placeholder?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input({
  title,
  type,
  id,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className='flex items-center gap-6 justify-between'>
      <label
        htmlFor={id}
        className={clsx("font-semibold text-left w-auto inline")}
      >
        {title}:
      </label>
      <input
        className={clsx(
          " w-full px-2 py-1 text-base text-gray-700 placeholder-gray-400",
          "bg-white border border-gray-300 rounded-lg shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          type === "number" ? "max-w-16" : "max-w-[400px]"
        )}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
