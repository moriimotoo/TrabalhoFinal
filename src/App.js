import './App.css';
import { AddCoffee } from './components/AddCoffee';
import { CoffeeList } from './components/CoffeeList';
import background from './img/bg2.jpg';

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw',
    height: '100vh', backgroundFilter: "blur(3px)"}} className="App">
      <AddCoffee/>
      <CoffeeList/>
    </div>
  );
}

export default App;
