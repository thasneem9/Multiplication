import { useState } from 'react';
import TableMenu from './components/TableMenu';
import QuizSession from './components/QuizSession';
import TableView from './components/TableView';
import './styles/app.css';

const STORAGE_KEY = 'tables_12_20_scores';
const TIMER_PREF_KEY = 'tables_12_25_timer_enabled';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [mode, setMode] = useState('menu'); // 'menu' | 'quiz' | 'view'

  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [timerEnabled, setTimerEnabled] = useState(() => {
    const saved = localStorage.getItem(TIMER_PREF_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleTimer = () => {
    setTimerEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(TIMER_PREF_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleSaveBestScore = (tableNum, score) => {
    setBestScores((prev) => {
      const prevBest = prev[tableNum] ?? 0;
      if (score <= prevBest) return prev;
      const updated = { ...prev, [tableNum]: score };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const openQuiz = (num) => {
    setSelectedTable(num);
    setMode('quiz');
  };

  const openTableView = (num) => {
    setSelectedTable(num);
    setMode('view');
  };

  const backToMenu = () => {
    setSelectedTable(null);
    setMode('menu');
  };

  return (
    <div className="app">
      <header className="top-bar">
        <h1>Multiplication Trainer</h1>
        <button
          type="button"
          className={`timer-toggle ${timerEnabled ? 'on' : 'off'}`}
          onClick={toggleTimer}
        >
          Timer Mode: {timerEnabled ? 'ON (6s)' : 'OFF'}
        </button>
      </header>

      {mode === 'menu' && (
        <TableMenu
          bestScores={bestScores}
          onSelectQuiz={openQuiz}
          onViewTable={openTableView}
        />
      )}

      {mode === 'quiz' && selectedTable !== null && (
        <QuizSession
          selectedTable={selectedTable}
          timerEnabled={timerEnabled}
          onFinishRound={handleSaveBestScore}
          onBack={backToMenu}
        />
      )}

      {mode === 'view' && selectedTable !== null && (
        <TableView
          tableNumber={selectedTable}
          onStartQuiz={openQuiz}
          onBack={backToMenu}
        />
      )}
    </div>
  );
}

export default App;