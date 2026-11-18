const MULTIPLIERS = Array.from({ length: 20 }, (_, i) => i + 1); // [1, 2, ..., 20]

const TableView = ({ tableNumber, onStartQuiz, onBack }) => {
  return (
    <div className="table-view-container">
      <div className="session-header">
        <button className="btn-link" onClick={onBack}>
          ← Tables
        </button>
        <h2>Table of {tableNumber}</h2>
        <button className="btn primary" onClick={() => onStartQuiz(tableNumber)}>
          Quiz {tableNumber}
        </button>
      </div>

      <div className="facts-grid">
        {MULTIPLIERS.map((m) => (
          <div key={m} className="fact-row">
            <span className="fact-expr">
              {tableNumber} × {m}
            </span>
            <span className="fact-eq">=</span>
            <span className="fact-ans">{tableNumber * m}</span>
          </div>
        ))}
      </div>

      <div className="summary-actions">
        <button className="btn primary" onClick={() => onStartQuiz(tableNumber)}>
          Practice Table {tableNumber} Now
        </button>
        <button className="btn" onClick={onBack}>
          Back to Tables
        </button>
      </div>
    </div>
  );
};

export default TableView;