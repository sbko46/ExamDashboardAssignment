import React from "react";

const checkCorrect = (userAnswer = [], correctAnswer = []) => {
  if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) return false;
  return userAnswer.length === correctAnswer.length &&
    userAnswer.every((word, index) => word === correctAnswer[index]);
};

 function Result({ questions, answers }) {
  const score = questions.reduce((total, q, index) => {
    const isCorrect = checkCorrect(answers[index], q.correctAnswer);
    return total + (isCorrect ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-4 text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center">Result Summary</h2>
      <p className="text-lg text-center mb-6">
        Your score: <span className="font-semibold">{score} / {questions.length}</span>
      </p>

      <div className="space-y-6">
        {questions.map((q, i) => {
          const userAnswer = answers[i] || [];
          const isCorrect = checkCorrect(userAnswer, q.correctAnswer);

          return (
            <div key={i} className="bg-white shadow-md rounded-lg p-4 border">
              <p className="mb-2 font-semibold">
                Q{i + 1}:{" "}
                <span className="text-gray-700">{q.question.replace(/ _____________ /g, " _____ ")}</span>
              </p>

              <div className="mb-1">
                <strong>Your Answer: </strong>
                {userAnswer.length > 0 ? (
                  userAnswer.map((word, idx) => (
                    <span
                      key={idx}
                      className={`inline-block px-2 py-1 mx-1 rounded text-sm ${
                        word === q.correctAnswer[idx]
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {word}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Not answered</span>
                )}
              </div>

              {!isCorrect && (
                <div className="mt-1">
                  <strong>Correct Answer: </strong>
                  {q.correctAnswer.map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 mx-1 rounded text-sm bg-green-100 text-green-700"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Result
