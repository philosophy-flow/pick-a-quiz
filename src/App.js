import React, {useState, useEffect} from 'react';
import Category from './Category';
import Quiz from './Quiz/Quiz';


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


  return (
    <div className="App">
      {
        activeScreen === 'title' &&
          <div className="title-container">
            <h1 className="title-text">Welcome to Pick a Quiz!</h1>
            <button
               className="title-btn"
               onClick={() => setActiveScreen('categories')}
            >
              Pick a Category
            </button>
          </div>
      }
      {
        activeScreen === 'categories' &&
          <div className="categories-container">
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
          </div>
      }
      {activeScreen === 'quiz' && <Quiz quizData={quizData} />}
    </div>
  );
}

export default App;
