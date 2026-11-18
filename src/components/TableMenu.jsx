const TABLES = Array.from({ length: 14 }, (_, i) => i + 12); // [12, 13, ..., 25]

const TableMenu = ({ bestScores, onSelectQuiz, onViewTable }) => {
  return (
    <div className="menu-container">
      <h2>Select a Table (12 – 25)</h2>
      <div className="table-grid">
        {TABLES.map((num) => {
          const best = bestScores[num];
          return (
            <div key={num} className="table-card">
              <button
                type="button"
                className="table-main-btn"
                onClick={() => onSelectQuiz(num)}
              >
                <span className="table-num">Table {num}</span>
                <span className="table-score">
                  {best !== undefined ? `Best: ${best}/24` : 'Not played'}
                </span>
              </button>

              <button
                type="button"
                className="view-table-btn"
                onClick={() => onViewTable(num)}
              >
                View Table
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableMenu;