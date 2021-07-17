import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(async () => {
    const getIngredientsResponse = await fetch('https://react-hooks-70ec4-default-rtdb.firebaseio.com/ingredients.json');
    const ingredientsResponse = await getIngredientsResponse.json();
    const allIngredients = [];
    for (let key in ingredientsResponse) {
      allIngredients.push({
        id: key,
        ...ingredientsResponse[key]
      });
    }
    setIngredients();
  }, []);

  const handleAddIngredient = async (ingredient) => {
    const addIngredientResponse = await fetch('https://react-hooks-70ec4-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        "content-type": 'application/json'
      }
    });
    const addIngredientResponseData = await addIngredientResponse.json();
    setIngredients((previousIngredients) => {
      return [...previousIngredients, { id: addIngredientResponseData.name, ...ingredient }]
    });
  };

  const handleRemoveIngredient = (id) => {
    setIngredients((previousIngredients) => {
      return previousIngredients.filter((ingredient) => {
        return ingredient.id !== id;
      });
    });
  };

  return (
    <div className="App">
      <IngredientForm onIngredientAdd={handleAddIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={handleRemoveIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
