import logo from './logo.svg';
import './App.css';
import ThreeDScene from './components/ThreeDScene';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Modelo de celular 3d ejecutado en React.js
        </p>
        <ThreeDScene />
      </header>
    </div>
  );
}

export default App;
