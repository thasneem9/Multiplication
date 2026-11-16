import { useState } from 'react';
import QuestionCard from './QuestionCard';
import { createTableRound } from '../utils/quizEngine';

const QuizSession = ({ selectedTable, onFinishRound, onBack }) => {
  const [questions, setQuestions] = useState(() => createTableRound(selectedTable));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]); // Stores all attempted questions + userAnswer

  const isFinished = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];

  const handleNext = (resultItem) => {
    const updatedResults = [...results, resultItem];
    setResults(updatedResults);

    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);

    // Save best score when completing a full 8-question round
    if (nextIdx >= questions.length && questions.length === 8) {
      const score = updatedResults.filter((r) => r.isCorrect).length;
      onFinishRound(selectedTable, score);
    }
  };

  if (isFinished) {
    const correctCount = results.filter((r) => r.isCorrect).length;
    const wrongList = results.filter((r) => !r.isCorrect);

    return (
      <div className="summary-container">
        <h2>Table {selectedTable} Complete</h2>
        <p className="final-score">
          Score: <strong>{correctCount} / {results.length}</strong>
        </p>

        {wrongList.length > 0 ? (
          <div className="wrong-list">
            <h3>Wrong Questions Review</h3>
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {wrongList.map((item) => (
                  <tr key={item.key}>
                    <td>{item.a} × {item.b}</td>
                    <td className="wrong-text">{item.userAnswer}</td>
                    <td className="correct-text">{item.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="perfect-msg">Flawless! Zero mistakes.</p>
        )}

        <div className="summary-actions">
          {wrongList.length > 0 && (
            <button
              className="btn primary"
              onClick={() => {
                setQuestions(
                  wrongList.map(({ a, b, answer, key }) => ({ a, b, answer, key }))
                );
                setResults([]);
                setCurrentIndex(0);
              }}
            >
              Retry {wrongList.length} Wrong
            </button>
          )}

          <button
            className="btn"
            onClick={() => {
              setQuestions(createTableRound(selectedTable));
              setResults([]);
              setCurrentIndex(0);
            }}
          >
            Restart Table {selectedTable}
          </button>

          <button className="btn" onClick={onBack}>
            Back to Tables
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-container">
      <div className="session-header">
        <button className="btn-link" onClick={onBack}>
          ← Tables
        </button>
        <span>Table {selectedTable}</span>
        <span>
          Question {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <QuestionCard question={currentQuestion} onNext={handleNext} />
    </div>
  );
};

export default QuizSession;