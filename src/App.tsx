import './App.css';
import { CanvasContainer } from './components/ui/CanvasContainer/CanvasContainer';
import { DisplayPanel } from './components/ui/DisplayPanel';
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
