import logo from './logo.svg';
import './App.css';
import Clock from './Clock';


function App() {
  
  return (
    <div className="App">
      <header className="App-header" id="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Clock date={new Date()} />
      </header>
    </div>
  );
}

export default App;