import './Profile.scss';
import { useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector(state => state);

  return (
    <div className="Profile">
        <h1 className="Profile__title">Profil</h1>
        <p className="Profile__names">{user.name}</p>
    </div>
  );
};

export default Profile;
