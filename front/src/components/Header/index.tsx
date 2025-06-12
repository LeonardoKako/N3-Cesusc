import logo from "../../assets/images/logo.png";

export function Header() {
  return (
    <>
      <header className='flex flex-col items-start gap-6 justify-between px-20 py-6 '>
        <img src={logo} className='w-full max-w-50' alt='Logo supermercado' />
        <div className='w-full h-0.5 bg-blue-950'></div>
      </header>
    </>
  );
}
