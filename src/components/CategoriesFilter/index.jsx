import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { api } from 'data/api.json';
import uuid from 'react-uuid';

const CategoriesFilter = ({ handleCategory, selectCat }) => {
  const [categories, setCategories] = useState('');
  const user = useSelector(state => state)
  
  const fetchCategories = () => {
    fetch(`${api}categories`, {
      method: 'get',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setCategories(response);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <select key={uuid()} className="CreateFormation__form__select" name={`category_id`} onChange={handleCategory} value={selectCat}>
        <option value="0">Toutes</option>
      {categories && categories.map((category)=> (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  );
};

export default CategoriesFilter;