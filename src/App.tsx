import './App.css';
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer';
import { DisplayPanel } from './components/DisplayPanel';
import { GameContextProvider } from './context/gameContext';

function App() {
  return (
    <div className='App'>
      <GameContextProvider>
        <CanvasContainer />
        <DisplayPanel />
      </GameContextProvider>
    </div>
  );
}

export default App;
