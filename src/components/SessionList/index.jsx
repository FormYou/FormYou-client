import './SessionList.scss';
import React, { useState, useEffect } from "react";
import { api } from 'data/api';
import { Link } from 'react-router-dom';

const SessionList = ({ formation_id }) => {
	const [sessions, setSessions] = useState();

  useEffect(() => {
      getSessions()
  }, [])

	const getSessions = () => {
        fetch(`${api}/formations/${formation_id}/sessions`, {
          method: 'get'
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          setSessions(response)
        })
        .catch((error) => console.log(error));
  	}

  return (
    <ul className="SessionList">
      {sessions &&  sessions.map((session) => (
        <Link to="/">
          <li className="SessionList__item">{session.date}</li>
        </Link>
      ))}
    </ul>
  );
};

export default SessionList;
