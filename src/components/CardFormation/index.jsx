import './CardFormation.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardFormation = ({ formation }) => {
	const user = useSelector(state => state);

  return (
  	<Link to={user.role !== undefined ? `/formation/${formation.id}` : "/"}>
      <div className="CardFormation">
        <h2 className="CardFormation__title">{formation.title}</h2>
      </div>
    </Link>
  );
};

export default CardFormation;