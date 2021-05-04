import './Quiz.css';


import React, {useState} from 'react';
import shuffle from './shuffleArray.js'

const Quiz = ({quizData, backToCategory}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrong, setShowWrong] = useState(false);

  // format encoded response data
  const formattedData = quizData.map(item => {
    return {
        question: decodeURIComponent(item.question),
        correctAnswer: decodeURIComponent(item.correct_answer),
        allAnswers: shuffle([item.correct_answer, ...item.incorrect_answers])
    }
  });

  // format answer array for each question
  formattedData.forEach((item, index) => {
    item.allAnswers = item.allAnswers.map(answer => decodeURIComponent(answer));
  });


  function handleAnswerSelect(selection, correctAnswer, question) {
    if (currentQuestion + 1 < formattedData.length) {
      if (selection === correctAnswer) {
        setScore(score + 1);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setWrongAnswers(wrongAnswers =>
          [...wrongAnswers, {question, selection, correctAnswer}]
        )
      }
    } else {
      // handle case where last answer is wrong
      if (selection !== correctAnswer) {
        setWrongAnswers(wrongAnswers =>
          [...wrongAnswers, {question, selection, correctAnswer}]
        )
      }

      setShowScore(true);
      setCurrentQuestion(0);
    }
  }


  function handleWrongAnswers() {
    setShowWrong(!showWrong);
  }


  return (
    <div className="Quiz">
      {showScore ? (
        <div className='score-container'>
          <span className="score-text">
            You scored {score} out of {formattedData.length}
          </span>
          <button className="score-button" onClick={backToCategory}>Back to Category Selection</button>
          <button className="score-button" onClick={handleWrongAnswers}>
            {!showWrong ? 'Show Wrong Answers' : 'Hide Wrong Answers'}
          </button>
        </div>
      ) :
        (<div className="question-section">
          <div className="count-container">
            <span className="count-text">Question {currentQuestion + 1} / {formattedData.length}</span>
          </div>
          <div className="question">{formattedData[currentQuestion].question}</div>
          <div className="answers-container">
            {
              formattedData[currentQuestion].allAnswers.map(
                answer => (
                  <button
                    key={answer}
                    className="answer"
                    onClick={() => handleAnswerSelect(
                      answer,
                      formattedData[currentQuestion].correctAnswer,
                      formattedData[currentQuestion].question
                    )}
                  >
                    {answer}
                  </button>)
              )
            }
          </div>
        </div>)
      }
      {showWrong ? (
        <div className="wrong-answer-container">
          {
            wrongAnswers.map(answer => (
              <div key={answer.question} className="wrong-answer">
                <p>Question: {answer.question}</p>
                <p className="your-answer">Your answer: {answer.selection}</p>
                <p className="correct-answer">Correct answer: {answer.correctAnswer}</p>
              </div>
            ))
          }
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
