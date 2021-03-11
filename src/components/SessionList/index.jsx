import './SessionList.scss';
import React, { useState, useEffect } from "react";
import { api } from 'data/api';
import { Link } from 'react-router-dom';

const SessionList = ({ formation_id }) => {
	const [allSessions, setAllSessions] = useState();

  useEffect(() => {
      getSessions()
  }, [])

	const getSessions = () => {
    fetch(`${api}/formations/${formation_id}/sessions`, {
      method: 'get'
    })
    .then((response) => response.json())
    .then((response) => {
      setAllSessions(response.filter(answer => answer.formation_id == formation_id))
    })
    .catch((error) => console.log(error));
	}

  const formatDate = (dateString) => {
    return dateString.match
  } 

  return (
    <ul className="SessionList">
      {allSessions && allSessions.map((session) => (
        <Link to="/">
          <li className="SessionList__item">{`${session.date.substring(8, 10)} ${["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",][parseInt(session.date.substring(5, 7) - 1, 10)]} ${session.date.substring(0, 4)}`}</li>
        </Link>
      ))}
    </ul>
  );
};

export default SessionList;
