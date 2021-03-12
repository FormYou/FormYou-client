import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { api } from 'data/api.json';
import './index.scss'


const TeacherInfo = () => {
    const user = useSelector(state => state)
    const [teacherInfo, setTeacherInfo] = useState();

    const teacherAsignement = () => {
        fetch(`${api}users/${user.id}`, {
            method: 'get',
            headers: {
              'Authorization': user.token,
              'Content-Type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setTeacherInfo(response)
            }).catch((error) => `error : ${error}`)
        
    }

    useEffect(() => {
        teacherAsignement()
      }, [])

    return (
        <div>
           <ul className="Formations__list">
               <h2>Les formations qui vont sont assignées</h2>
          {teacherInfo && teacherInfo.formations.map((formation) => (
            <li className="Formations__list__item" key={formation.id}>
                {formation.title}
            </li>
          )) 
        }
        </ul>
        </div>
    ) 
        
}

export default TeacherInfo