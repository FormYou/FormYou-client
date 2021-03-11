import './Profile.scss';
import { useSelector } from 'react-redux';
import SessionList from 'components/SessionList';
import TeacherInfo from 'components/Teacher';

const Profile = () => {
	const user = useSelector(state => state);

  return (
    <div className="Profile">
    	<div className="Profile__head">
	        <h1 className="Profile__head__title">Profil</h1>
	        <p className="Profile__head__names">{user.name}</p>
        </div>
        <div className="Profile__sessions">
        	<h2>Sessions à venir</h2>
        </div>
        <div className="Profile__sessions">
        	<h2>Sessions passées</h2>
        </div>
        <div className="Profile__sessions">
          {user.role == 'teacher' && <TeacherInfo />}
        </div>
    </div>
  );
};

export default Profile;
