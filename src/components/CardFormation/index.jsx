import './CardFormation.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardFormation = ({ formation }) => {
	const user = useSelector(state => state);

  return (
  	<Link to={user.role !== undefined ? `/formation/${formation.id}` : "/"}>
      <div className="CardFormation">
        <h2 className="CardFormation__title">{formation && formation.title}</h2>
        {formation && formation.categories.map((category) => (
          <p key={category.id} className="CardFormation__category">{category.name}</p>
        ))}
      </div>
    </Link>
  );
};

export default CardFormation;
