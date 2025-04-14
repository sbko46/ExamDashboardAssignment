import React, { useState, useEffect } from "react";
import questionsData from "./components/questions.json";
import Question from "./components/Question";
import Timer from "./components/Timer";
import Result from "./components/Result";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questionsData.data.questions[currentIndex];

  const numBlanks = currentQuestion?.question?.split(" _____________ ").length - 1 || 0;

  const userAnswer = answers[currentIndex]?.selectedOptions || Array(numBlanks).fill(null);

  const handleAnswer = (questionId, selectedOptions) => {
    const updated = [...answers];
    updated[currentIndex] = {
      questionId,
      selectedOptions,
    };
    setAnswers(updated);
  };

  const goToNext = () => {
    if (currentIndex < questionsData.data.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeUp(false);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (timeUp) {
      goToNext();
    }
  }, [timeUp]);

  if (showResult) {
    return <Result questions={questionsData.data.questions} answers={answers} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-26">
        <Timer key={currentIndex} setTimeUp={setTimeUp} />
        <Question
          question={currentQuestion}
          selectedOptions={userAnswer}
          onSelect={(options) => handleAnswer(currentQuestion.questionId, options)}
        />
        <div className="mt-3 text-right">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
            disabled={userAnswer.includes(null)} 
            onClick={goToNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
