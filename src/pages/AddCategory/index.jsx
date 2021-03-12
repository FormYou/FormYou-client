import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { api } from 'data/api.json';

const AddCategory = () => {
  const [categories, setCategories] = useState('');
  const user = useSelector(state => state);
  const [form, setForm] = useState('');

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
    fetchCategories();
  }, []);

  const createCategory = (e) => {
    e.preventDefault();
    fetch(`${api}categories`, {
      method: 'post',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: form})
    })
    .then((response) => fetchCategories())
    .catch((error) => console.log(error));
  }

  return (
    <div className="AddCategory">
      <form className="CreateCategory__form" onSubmit={createCategory}>
          <input className="CreateCategory__form__name" name="title" value={form.title}placeholder="titre" onChange={(e) => setForm(e.target.value)}/>
          <button type="submit">Ajouter</button>
      </form>
      {categories && categories.map((category) => (
        <li key={category.id}>
          <h3>{category.name}</h3>
        </li> 
      ))}
    </div>
  );
};

export default AddCategory;