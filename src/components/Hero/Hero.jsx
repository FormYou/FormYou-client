import './Hero.scss';
import courses from './src/img/courses.svg';

const Hero = () => {

  return (
    <div className="Hero">
        <h1 className="Hero__title">Hello from Hero!</h1>
        <img className="Hero__image" src={courses} alt='laptop online courses'/>
    </div>
  );
};

export default Hero;
