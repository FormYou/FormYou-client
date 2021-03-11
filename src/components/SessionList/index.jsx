import './SessionList.scss';
import React, { useState, useEffect } from "react";

const SessionList = () => {
	const [sessions, setSessions] = useState();

	const getSessions = () => {
        fetch(`${api}formations/${id}/sessions`, {
          method: 'get'
        })
        .then((response) => response.json())
        .then((response) => {
          setSessions(response)
        })
        .catch((error) => console.log(error));
  	}

  return (
    <div className="SessionList page">
        <p>Hello from SessionList</p>
    </div>
  );
};

export default SessionList;
