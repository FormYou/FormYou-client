import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { api } from 'data/api.json';
import './Session.scss'

const Sessions = () => {
  const userToken = useSelector(state => state.token);
  const [sessionDate, setSessionDate] = useState([]);
  let arr; 
  const sessionFetch = () => {
    fetch(`${api}sessions`, {
      method: 'get',
      headers: {
        'Authorization': userToken,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((response) => {
        setSessionDate(response)

      }).catch((error) => `error : ${error}`)
  }
  
  useEffect(() => {
    sessionFetch()
  }, [])

  if (sessionDate.length > 1) {
    arr = sessionDate.map(item => (
      {title: `${item.formation.title} participant: ${item.attendences.length}`, date: item.date}
    ))
  }

  return (
    <div className='Sessions'>
  
      <h2>Toute les Sessions</h2>
      
      {sessionDate && <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={arr}
        /> }
    </div>
  )
}
export default Sessions;
