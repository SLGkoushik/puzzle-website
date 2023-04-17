import React, { useState } from 'react';

function QuestionPage({ onNextPage }) {
  const [answers, setAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const questions = [
    { question: 'How many lowercase and uppercase letters are there in the memory game?(ans lower followed by upper)', answer: '26' },
    { question: 'What is the largest word in word search?', answer: 'MONARCHY' },
    { question: 'What is the length of smallest valid english word in word search?', answer: '3' }
  ];

  const handleAnswerChange = (index, value) => {
    const newAnswers = ['26','MONARCHY','3'];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the answers here (e.g. compare to expected answers)
    const expectedAnswers = questions.map((q) => q.answer);
    if (JSON.stringify(answers) === JSON.stringify(expectedAnswers)) {
      onNextPage();
    }
  };

  return (
    <div>
      <h1>Answer these question based on previous puzzles played.<br></br>
        If all the questions are answered correctly them you can meet Mr. Arthur Smith <br></br>
        Or start again from Room 1 </h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div key={i}>
            <p>{q.question}</p>
            <input
              type="text"
              value={answers[i] || ''}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {currentPage < 3 && (
        <button onClick={handleNextPage}>Finish</button>
      )}
    </div>
  );
}

function SuccessPage() {
  return (
    <div>
      <h1>Success!</h1>
      <p>You answered all questions correctly and your detective job is complete.</p>
    </div>
  );
}

function MultiPageForm() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {currentPage === 1 && <QuestionPage onNextPage={handleNextPage} />}
      {currentPage === 2 && <QuestionPage onNextPage={handleNextPage} />}
      {currentPage === 3 && <QuestionPage onNextPage={handleNextPage} />}
      {currentPage === 4 && <SuccessPage />}
    </div>
  );
}

export default MultiPageForm;

