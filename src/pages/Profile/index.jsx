import './Profile.scss';
import React, { useState, useEffect } from "react";
import { api } from 'data/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SessionList from 'components/SessionList';
import TeacherInfo from 'components/Teacher';

const Profile = () => {
	const user = useSelector(state => state);
    const [allSessions, setAllSessions] = useState();
    const [pastSessions, setPastSessions] = useState();
    const [futureSessions, setFutureSessions] = useState();
    const token = useSelector((state) => state.token);

    useEffect(() => {
      getSessions()
    }, [])

    useEffect(() => {
    allSessions && getPast()
    allSessions && getFuture()
    }, [allSessions])

    const getSessions = () => {
        fetch(`${api}/formations/1/sessions`, {
          method: 'get',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((response) => {
          setAllSessions(response)
        })
        .catch((error) => console.log(error));
    }

    const getPast = () => {
      allSessions && setPastSessions(allSessions.filter(answer => new Date(answer.date).getTime() - Date.now() < 0))
    }

    const getFuture = () => {
      setFutureSessions(allSessions.filter(answer => new Date(answer.date).getTime() - Date.now() > 0))
    }

    const getFormatedDate = (session) => {
      const months = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
      return `${session.date.substring(8, 10)} ${months[parseInt(session.date.substring(5, 7) - 1, 10)]} ${session.date.substring(0, 4)}`
    }

  return (
    <div className="Profile">
    	<div className="Profile__head">
	        <h1 className="Profile__head__title">Profil</h1>
	        <p className="Profile__head__names">{user.name}</p>
        </div>

        <h2 className="Profile__pastSessions">Sessions Passées</h2>
        <ul className="Profile__past">
          {pastSessions && pastSessions.map((session) => (
            <Link to={`/sessions/${session.id}`} key={session.id}>
              <li className="SessionList__item">{getFormatedDate(session)}</li>
            </Link>
          ))}
        </ul>
        <h2 className="Profile__futureSession">Sessions à Venir</h2>
        <ul className="Profile__future">
          {futureSessions && futureSessions.map((session) => (
            <Link to={`/sessions/${session.id}`} key={session.id}>
              <li className="SessionList__item">{getFormatedDate(session)}</li>
            </Link>
          ))}
        </ul>
        <div className="Profile__sessions">
          {user.role == 'teacher' && <TeacherInfo />}
        </div>
    </div>
  );
};

export default Profile;
    