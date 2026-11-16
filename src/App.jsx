import { useState } from 'react';
import TableMenu from './components/TableMenu';
import QuizSession from './components/QuizSession';
import './styles/app.css';

const STORAGE_KEY = 'tables_12_25_best_scores';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const handleSaveBestScore = (tableNum, score) => {
    setBestScores((prev) => {
      const prevBest = prev[tableNum] ?? 0;
      if (score <= prevBest) return prev;
      const updated = { ...prev, [tableNum]: score };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="app">
      <h1>Multiplication Trainer</h1>

      {selectedTable === null ? (
        <TableMenu
          bestScores={bestScores}
          onSelectTable={(num) => setSelectedTable(num)}
        />
      ) : (
        <QuizSession
          selectedTable={selectedTable}
          onFinishRound={handleSaveBestScore}
          onBack={() => setSelectedTable(null)}
        />
      )}
    </div>
  );
}

export default App;