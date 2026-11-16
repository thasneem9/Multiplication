const TABLES = Array.from({ length: 14 }, (_, i) => i + 12); // [12, 13, ..., 25]

const TableMenu = ({ bestScores, onSelectTable }) => {
  return (
    <div className="menu-container">
      <h2>Select a Table (12 – 25)</h2>
      <div className="table-grid">
        {TABLES.map((num) => {
          const best = bestScores[num];
          return (
            <button
              key={num}
              className="table-btn"
              onClick={() => onSelectTable(num)}
            >
              <span className="table-num">Table {num}</span>
              <span className="table-score">
                {best !== undefined ? `Best: ${best}/8` : 'Not played'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableMenu;