import React, { useEffect, useState } from 'react';
import { api } from 'data/api.json';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';

const GetCategories = ({ handleChange, setFormation, formation }) => {
  const [categories, setCategories] = useState('');
  const [addCategory, setAddCategory] = useState([])
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

  const handleSelect = () => {
    setAddCategory([
      ...addCategory,
      <select key={uuid()} className="CreateFormation__form__select" name={`category_id`} onChange={handleChange}>
        {categories && categories.map((category)=> (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    ])
    setFormation({...formation, category_id: [...formation.category_id, categories[0].id]})
  }


  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <button type="button" onClick={handleSelect}>Ajouter catégorie</button>
      {addCategory}
    </div>
  );
};

export default GetCategories;