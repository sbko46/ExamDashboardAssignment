import React, { useState } from "react";

 function Question({ question, selectedOptions, onSelect }) {
  if (!question || !question.question || !question.options) {
    return <div className="text-red-500 font-semibold">Invalid question data.</div>;
  }

  const blanks = question.question.split(" _____________ ");

  const handleSelect = (word) => {
    const updated = [...selectedOptions];
    const firstEmptyIndex = updated.findIndex(item => item === null);

    if (firstEmptyIndex !== -1 && !updated.includes(word)) {
      updated[firstEmptyIndex] = word;
      onSelect(updated);
    }
  };

  const handleUnselect = (index) => {
    const updated = [...selectedOptions];
    updated[index] = null;
    onSelect(updated);
  };

  return (
    <div>
      <p className="text-lg mb-6 leading-relaxed">
        {blanks.map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks.length - 1 && (
              <span
                className={`inline-block min-w-[100px] text-center px-3 py-1 mx-1 rounded border 
                  ${
                    selectedOptions[i]
                      ? "bg-blue-200 text-blue-800 cursor-pointer hover:bg-blue-300"
                      : "bg-gray-100 text-gray-500"
                  }`}
                onClick={() => selectedOptions[i] && handleUnselect(i)}
              >
                {selectedOptions[i] || "______"}
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        {question.options.map((word, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded border shadow-sm text-sm transition duration-150
              ${
                selectedOptions.includes(word)
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-blue-100 hover:border-blue-400"
              }`}
            disabled={selectedOptions.includes(word)}
            onClick={() => handleSelect(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question





