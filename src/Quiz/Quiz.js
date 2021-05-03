import './Quiz.css';


import React, {useState} from 'react';
import shuffle from './shuffleArray.js'

const Quiz = ({quizData}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

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
    item.allAnswers = decodeURIComponent(item.allAnswers).split(',');
  });


  function handleAnswerSelect(selection, correctAnswer) {
    if (currentQuestion + 1 < formattedData.length) {
      if (selection === correctAnswer) {
        setScore(score + 1);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      setShowScore(true);
      setCurrentQuestion(0);
    }
  }


  return (
    <div className="Quiz">
      {showScore ? (
        <div className='score'>
          <span>
            You scored {score} out of {formattedData.length}
          </span>
          <button>Back to Category Selection</button>
        </div>
      ) :
        (<div className="question-section">
          <div className="count">
            <span>Question {currentQuestion + 1} / {formattedData.length}</span>
          </div>
          <div className="question">{formattedData[currentQuestion].question}</div>
          <div className="answers">
            {
              formattedData[currentQuestion].allAnswers.map(
                answer => (
                  <button
                    key={answer}
                    className="answer"
                    onClick={() => handleAnswerSelect(answer, formattedData[currentQuestion].correctAnswer)}>
                    {answer}
                  </button>)
              )
            }
          </div>
        </div>)
      }
    </div>
  );
};

export default Quiz;
