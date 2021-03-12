import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { api } from 'data/api.json';

const Room = () => {
  const user = useSelector(state => state);
  const [roomNumber, setRoomNumber] = useState();
  const [allRooms, setAllRooms] = useState([])

  const createRoom = (e) => {
    e.preventDefault();
    fetch(`${api}rooms`, {
      method: 'post',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({room_number: roomNumber})
    })
    .then((response) => everyRoom())
    .catch((error) => console.log(error));
  }

  const everyRoom = () => {
    fetch(`${api}rooms`, {
      method: 'get',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((response) => {
        setAllRooms(response)
    }).catch((error) => console.log(error)); 
  }

  const handleRoom = (id) => {
    fetch(`${api}rooms/${id}`, {
      method: 'delete',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => everyRoom())
    .catch((error) => console.log(error));
  }


  useEffect(() => {
    everyRoom()
  }, [])

  return (
    <div className='Room'>
      <form className="CreateCategory__form" onSubmit={createRoom}>
          <input className="CreateCategory__form__name" name="roomNumber" placeholder="Room number" onChange={(e) => setRoomNumber(e.target.value)}/>
          <button type="submit">Ajouter</button>
      </form>
      <h2>SALLES:</h2>
    {allRooms && 
    <ul>
        {allRooms.map((room) => (
            <li key={room.id}>
                <h3> Salle numéro: {room.room_number} <button onClick={()=> handleRoom(room.id)}>delete</button></h3>
            </li>
        ))}
    </ul>
    }
    </div>
  );
};

export default Room;