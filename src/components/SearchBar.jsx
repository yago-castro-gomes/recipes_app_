import React, { useState } from 'react';
import { fetchIngredient, fetchName, fetchLetter } from '../services/apiFood';

export default function SearchBar() {
  const [radioState, setRadioState] = useState('');
  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState([]);

  const searchApi = async () => {
    if (radioState === 'Ingredient') {
      setData(await fetchIngredient(textInput));
    }
    if (radioState === 'Name') {
      setData(await fetchName(textInput));
    }
    if (radioState === 'FristLetter') {
      setData(await fetchLetter(textInput));
    }
  };
  console.log(textInput);
  console.log(data);

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setTextInput(e.target.value) }
        />
      </div>
      <div>
        <label htmlFor="radio-search">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="radio-search"
            value="Ingredient"
            onChange={ (e) => setRadioState(e.target.value) }
          />
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            name="radio-search"
            value="Name"
            onChange={ (e) => setRadioState(e.target.value) }
          />
          Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="radio-search"
            value="FirstLetter"
            onChange={ (e) => setRadioState(e.target.value) }
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ searchApi }
        >
          Search

        </button>
      </div>
    </div>
  );
}
