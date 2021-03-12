import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { api } from 'data/api.json';
import { useSelector } from 'react-redux';

const Inscription = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState();
  const user = useSelector(state => state);
  const [check, setCheck] = useState(false);

  const getSession = () => {
    fetch(`${api}sessions/${sessionId}`, {
      method: 'get',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setSession(response);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getSession();
  }, [])

  useEffect(() => {
    if (session) alreadySign();
  }, [session])

  const addUser = () => {
    fetch(`${api}attendences`, {
      method: 'post',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({session_id: sessionId})
    })
    .then((response) => {
      getSession()
    })
    .catch((error) => console.log(error));
  }

  const removeUser = () => {
    const remove = session.attendences.filter(att => {
      return att.user_id == user.id
    })
    fetch(`${api}attendences/${remove[0].id}`, {
      method: 'delete',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({session_id: sessionId})
    })
    .then((response) => {
      getSession()
    })
    .catch((error) => console.log(error));
  }

  const alreadySign = () => {
    const userCheck = session.attendences.filter(att => att.user_id == user.id)
    return userCheck[0] ? setCheck(true) : setCheck(false);
  }

  return (
    <div className='Inscription'>
      {session && (
        <>
          <h2>Session pour {session.formation.title}</h2>
          <h3>Date de la session : {session.date}</h3>
          <h3>Nombre de participants : {session.attendences.length < 21 ? session.attendences.length : "complet"}</h3>
          {session.attendences.length < 21 && user.role === "étudiant" &&  !check && (
              <button type="button" className="btn-primary" onClick={addUser}>S'inscrire à cette session</button>
          )}
          {session.attendences.length < 21 && user.role === "étudiant" && check && (
            <button type="button" className="btn-primary" onClick={removeUser}>Se retirer de la session</button>
          )}
        </>
      )}
    </div>
  );
};

export default Inscription;