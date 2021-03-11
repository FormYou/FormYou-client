import './SessionList.scss';
import React, { useState, useEffect } from "react";
import { api } from 'data/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SessionList = ({ formation_id }) => {
	const [allSessions, setAllSessions] = useState();
  const [futureSessions, setFutureSessions] = useState();
  const token = useSelector((state) => state.token);

  useEffect(() => {
      getSessions()
  }, [])

  useEffect(() => {
    allSessions && getFuture()
  }, [allSessions])

	const getSessions = () => {
    fetch(`${api}/formations/${formation_id}/sessions`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      setAllSessions(response.filter(answer => answer.formation_id == formation_id))
    })
    .catch((error) => console.log(error));
	}

  const getFuture = () => {
    setFutureSessions(allSessions.filter(answer => new Date(answer.date).getTime() - Date.now() > 0))
  }

  const getFormatedDate = (session) => {
    const months = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
    return `${session.date.substring(8, 10)} ${months[parseInt(session.date.substring(5, 7) - 1, 10)]} ${session.date.substring(0, 4)}`
  }

  return (
    <div>
    <ul className="SessionList">
      {futureSessions && futureSessions.map((session) => (
        <Link to={`/sessions/${session.id}`} key={session.id}>
          <li className="SessionList__item">{getFormatedDate(session)}</li>
        </Link>
      ))}
    </ul>
    </div>
  );
};

export default SessionList;
