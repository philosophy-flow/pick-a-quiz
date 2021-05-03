import React, {useState} from 'react';


function App() {
  const [activeScreen, setActiveScreen] = useState('title');


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
            <button className="category">Books</button>
            <button className="category">Video Games</button>
            <button className="category">Film</button>
            <button className="category">Computers</button>
            <button className="category">Art</button>
            <button className="category">Mathematics</button>
            <button className="category">Politics</button>
            <button className="category">Animals</button>
          </div>
      }
    </div>
  );
}

export default App;
