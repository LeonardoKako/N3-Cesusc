import { Cards } from "./components/Cards";
import { Header } from "./components/Header";
import { NewItem } from "./components/NewItem";

function App() {
  return (
    <div className='bg-slate-100 relative min-h-screen w-full'>
      <Header />
      <Cards />
      <NewItem />
    </div>
  );
}

export default App;
