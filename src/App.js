import './App.css';
import { AddCoffee } from './components/AddCoffee';
import { CoffeeList } from './components/CoffeeList';

function App() {
  return (
    <div className="App">
      <AddCoffee/>
      <CoffeeList/>
    </div>
  );
}

export default App;
