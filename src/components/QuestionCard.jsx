import { useState, useEffect, useRef } from 'react';

const QUESTION_DURATION = 6; // seconds

const QuestionCard = ({ question, timerEnabled, onNext }) => {
  const [inputVal, setInputVal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);

  const inputRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Reset state whenever a new question arrives or timer mode changes
  useEffect(() => {
    setInputVal('');
    setSubmitted(false);
    setTimedOut(false);
    setTimeLeft(QUESTION_DURATION);
    inputRef.current?.focus();
  }, [question]);

  // Countdown interval when timer mode is ON and question is not yet submitted
  useEffect(() => {
    if (!timerEnabled || submitted) return;

    const endTime = Date.now() + QUESTION_DURATION * 1000;

    const interval = setInterval(() => {
      const remaining = Math.max(0, (endTime - Date.now()) / 1000);
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        setTimedOut(true);
        setSubmitted(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [question, timerEnabled, submitted]);

  // Focus Next button after submitting so pressing Enter advances immediately
  useEffect(() => {
    if (submitted) {
      nextBtnRef.current?.focus();
    }
  }, [submitted]);

  const hasTypedValue = inputVal.trim() !== '';
  const parsedAnswer = hasTypedValue ? Number(inputVal) : null;
  const isCorrect = parsedAnswer !== null && parsedAnswer === question.answer;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasTypedValue || submitted) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    onNext({
      ...question,
      userAnswer: parsedAnswer,
      isCorrect,
    });
  };

  const progressPercent = (timeLeft / QUESTION_DURATION) * 100;

  return (
    <div className="card-container">
      {timerEnabled && (
        <div className="timer-wrapper">
          <div className="timer-label">
            <span>Time Left</span>
            <span className={timeLeft <= 2 ? 'timer-urgent' : ''}>
              {timeLeft.toFixed(1)}s
            </span>
          </div>
          <div className="timer-bar-bg">
            <div
              className={`timer-bar-fill ${timeLeft <= 2 ? 'urgent' : ''}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

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
        />

        {!submitted ? (
          <button type="submit" className="btn primary" disabled={!hasTypedValue}>
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
            : timedOut && !hasTypedValue
            ? `Time's up! Correct answer: ${question.answer}`
            : `Wrong! Correct answer: ${question.answer}`}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;