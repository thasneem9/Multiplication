export function createTableRound(tableNumber, maxMultiplier = 20) {
  // Generates [2, 3, ..., 20] (19 questions)
  const multipliers = Array.from(
    { length: maxMultiplier - 1 },
    (_, i) => i + 2
  );

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