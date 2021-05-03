import './Quiz.css';
import React from 'react';
import shuffle from './shuffleArray.js'

const Quiz = ({quizData}) => {

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


  return (
    <div className="Quiz">
      QUIZ
    </div>
  );
};

export default Quiz;
