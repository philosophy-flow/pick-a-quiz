import React, {useState, useEffect} from 'react';
import Category from './Category';
import Quiz from './Quiz/Quiz';

import {motion, AnimatePresence} from 'framer-motion';


function App() {
  const [activeScreen, setActiveScreen] = useState('title');
  const [activeCategory, setActiveCategory] = useState('');
  const [quizData, setQuizData] = useState('');

  function handleCategorySelect (selection) {
    setActiveCategory(selection);
  }


  useEffect(() => {
    if (activeCategory) {
      let categoryId;
      switch (activeCategory) {
        case 'Books':
          categoryId = '10';
          break;
        case 'Video Games':
          categoryId = '15';
          break;
        case 'Film':
          categoryId = '11';
          break;
        case 'Computers':
          categoryId = '18';
          break;
        case 'Art':
          categoryId = '25';
          break;
        case 'Mathematics':
          categoryId = '19';
          break;
        case 'Politics':
          categoryId = '24';
          break;
        case 'Animals':
          categoryId = '27';
          break;
        default:
          break;
      }
      const url =
      `https://opentdb.com/api.php?amount=10&encode=url3986&type=multiple&category=${categoryId}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          setQuizData(data.results)
          setActiveScreen('quiz')
        });
    }
  }, [activeCategory])



  // reset app to category selection
  function backToCategory() {
    setActiveCategory('');
    setActiveScreen('categories');
  }


  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        {
          activeScreen === 'title' &&
            <motion.div
              className="title-container"
              key="title"
              initial={{height: 0}}
              animate={{height: '300px'}}
              exit={{height: 0}}
              transition={{duration: .5}}
            >
              <h1 className="title-text">Welcome to Pick a Quiz!</h1>
              <button
                 className="title-btn"
                 onClick={() => setActiveScreen('categories')}
              >
                Pick a Category
              </button>
            </motion.div>
        }

        {
          activeScreen === 'categories' &&
            <motion.div
                className="categories-container"
                key="categories"
                initial={{height: 0}}
                animate={{height: 'auto'}}
                exit={{height: 0}}
                transition={{duration: .5}}
            >
              <Category
                name='Books'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Video Games'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Film'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Computers'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Art'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Mathematics'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Politics'
                handleCategorySelect={handleCategorySelect}
              />
              <Category
                name='Animals'
                handleCategorySelect={handleCategorySelect}
              />
            </motion.div>
        }
        {activeScreen === 'quiz' &&
          <Quiz
            quizData={quizData}
            backToCategory={backToCategory}
          />
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
