import React from 'react';

const Category = ({name, handleCategorySelect}) => {
  return (
    <button
      className="category"
      onClick={() => handleCategorySelect(name)}
    >
      {name}
    </button>
  );
};


export default Category;
