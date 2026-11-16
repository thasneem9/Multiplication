export function createTableRound(tableNumber) {
  const multipliers = [2, 3, 4, 5, 6, 7, 8, 9];

  const questions = multipliers.map((m) => ({
    key: `${tableNumber}x${m}`,
    a: tableNumber,
    b: m,
    answer: tableNumber * m,
  }));

  // Fisher-Yates shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}