import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Session.scss'

const Sessions = () => {
  let birthday = '2021-04-01'
  let birthday2 = '2021-04-01'
  return (

        <FullCalendar className="fullCalendar"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[{ title: 'Mon super birthday', date: `${birthday}` },
          { title: "C'est encore mon birthday", date: `${birthday2}` }
          ]}
        />
  )
}
export default Sessions;
