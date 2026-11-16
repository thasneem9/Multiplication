import { useState, useEffect, useRef } from 'react';

const QuestionCard = ({ question, onNext }) => {
  const [inputVal, setInputVal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Reset state and focus input whenever a new question arrives
  useEffect(() => {
    setInputVal('');
    setSubmitted(false);
    inputRef.current?.focus();
  }, [question]);

  // Focus Next button after submitting so pressing Enter advances immediately
  useEffect(() => {
    if (submitted) {
      nextBtnRef.current?.focus();
    }
  }, [submitted]);

  const userNumber = Number(inputVal);
  const isCorrect = userNumber === question.answer;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() === '' || submitted) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    onNext({
      ...question,
      userAnswer: userNumber,
      isCorrect,
    });
  };

  return (
    <div className="card-container">
      <div className="card">
        <p className="question-text">
          {question.a} × {question.b} = ?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          ref={inputRef}
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={submitted}
          placeholder="Your answer"
          required
        />

        {!submitted ? (
          <button type="submit" className="btn primary">
            Submit
          </button>
        ) : (
          <button
            ref={nextBtnRef}
            type="button"
            className="btn next"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </form>

      {submitted && (
        <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect
            ? 'Correct!'
            : `Wrong! Correct answer: ${question.answer}`}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;