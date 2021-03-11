import './Formations.scss';
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import CreateFormation from 'components/CreateFormation/CreateFormation';
import CardFormation from 'components/CardFormation';
import CategoriesFilter from 'components/CategoriesFilter';

const Formations = () => {
	const [formations, setFormations] = useState([]);
  const [selectCat, setSelectCat] = useState();
  const user = useSelector(state => state);
  const [filteredFormations, setFilteredFormations] = useState();

	useEffect(() => {
    getFormations()
  }, [])

	const getFormations = () => {
        fetch(`${api}formations`, {
          method: 'get'
        })
        .then((response) => response.json())
        .then((response) => {
          setFormations(response);
          setSelectCat("0");
          setFilteredFormations(response)
        })
        .catch((error) => console.log(error));
  }

  const handleCategory = (e) => {
    setSelectCat(e.target.value)
    let selection = [];
    if (e.target.value === "0") {
      setFilteredFormations(formations)
    } else {
      formations.map((formation) => {
        const checkCat = formation.categories.filter((category) => {
          return category.id == e.target.value
        })
        if (checkCat[0]) {
          selection = [...selection, formation]
        }
      })
      setFilteredFormations(selection)
    }
  }

  return (
    <div className="Formations">
        <h1 className="Formations__title">Découvrez nos formations</h1>
        {user.role === "admin" ? <CreateFormation getFormations={getFormations}/> : ''}
        <CategoriesFilter handleCategory={handleCategory} selectCat={selectCat} />
        <ul className="Formations__list">
          {filteredFormations ? filteredFormations.map((formation) => (
            <li className="Formations__list__item" key={formation.id}>
              {formation && <CardFormation formation={formation} link={`/formation/${formation.id}`}/>}
            </li>
          )) : formations !== [] && formations.map((formation) => (
            <li className="Formations__list__item" key={formation.id}>
            {formation && <CardFormation formation={formation} link={`/formation/${formation.id}`}/>}
          </li>
        ))}
        </ul>
    </div>
  );
};

export default Formations;
