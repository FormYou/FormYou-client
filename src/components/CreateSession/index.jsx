import './CreateSession.scss';
import { api } from 'data/api';
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import GetCategories from 'components/GetCategories';

const CreateSession = ({ formation_id }) => {
  const [rooms, setRooms] = useState();
  const [fullDate, setFullDate] = useState({year:"", month:"", day:""});
  const [session, setSession] = useState({date:"", duration:1, room_id:[]});
  const user = useSelector(state => state);
  

	useEffect(() => {
    	getRooms()
  	}, [])

  useEffect(()=> {
    setSession({
      ...session, date: `${fullDate.year}-${fullDate.month}-${fullDate.day}`
    })
  },[fullDate])

	const getRooms = () => {
	    fetch(`${api}rooms`, {
          method: 'get',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
        })
	    .then((response) => response.json())
	    .then((response) => {
	      setRooms(response)
	    })
	    .catch((error) => console.log(error));
	}

  const createSession = (e) => {
      e.preventDefault();
      fetch(`${api}formations/${formation_id}/sessions`, {
          method: 'post',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(session)
        })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.value
    })
  }

  const getYearArr = () => {
    const currentYear = new Date().getFullYear();
    return Array(currentYear+10 - currentYear + 1).fill().map((_, idx) => currentYear + idx)
  };

  const getMonthArr = () => {
    return [["Mois",],["Janvier","01"],["Février","02"],["Mars","03"],["Avril","04"],["Mai","05"],["Juin","06"],["Juillet","07"],["Août","08"],["Septembre","09"],["Octobre","10"],["Novembre","11"],["Décembre","12"]]
  };

  const getDayArr = () => {
    return ["Jour","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
  };

  const handleFullDate = (e) => {
    setFullDate({
      ...fullDate,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="CreateSession">
      <h2 className="CreateSession__title">Nouvelle Session</h2>
      <form className="CreateSession__form" onSubmit={createSession}>
        <select className="CreateSession__form__room" name="room_id" onChange={handleChange}>
          {rooms && rooms.map((room) => (
            <option key={room.id} value={room.id}>{`salle n°${room.id}`}</option>
          ))}
        </select>
        <select className="CreateSession__form__year" name="year" onChange={handleFullDate}>
          <option>Année</option>
          { getYearArr().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select className="CreateSession__form__month" name="month" onChange={handleFullDate}>
          { getMonthArr().map((month) => (
            <option key={month} value={month[1]}>{month[0]}</option>
          ))}
        </select>
        <select className="CreateSession__form__day" name="day" onChange={handleFullDate}>
          { getDayArr().map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <input className="CreateSession__form__submit" type="submit" value="créer nouvelle session"/>
      </form>
    </div>
  );
};

export default CreateSession;
