import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { api } from 'data/api.json';
import './Session.scss'

const Sessions = () => {
  const userToken = useSelector(state => state.token);
  const [sessions, setSessions] = useState();
  const [sessionDate, setSessionDate] = useState([]);
  let arr = []
  const sessionFetch = () => {
    fetch(`${api}formations`, {
      method: 'get',
      headers: {
        'Authorization': userToken,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((response) => {
        response.map(formation => {
          formation.sessions.map(session => {
            arr.push(session.date)
           
          })
        })
        setSessions(arr)
        arr.map(item => {
          console.log(item)
          setSessionDate(...sessionDate, {title: 'hello', date: item})
        })

      }).catch((error) => `error : ${error}`)
  }

  useEffect(() => {
    sessionFetch()
  }, [])
  console.log(sessionDate)
  return (
    <div className='Sessions'>
  
      <h2>Toute les Sessions</h2>
      
      
        {sessionDate && <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"

        events={sessionDate}
      />}
    </div>
  )
}
export default Sessions;
