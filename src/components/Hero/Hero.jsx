import './Hero.scss';
import courses from './src/img/courses.svg';

const Hero = () => {

  return (
    <div className="Hero">
    	<img className="Hero__image" src={courses} alt='laptop online courses'/>
        <div className="Hero__presentation">
          <h1 className="Hero__presentation__title">Pourquoi prendre des cours avec YouForm ? </h1>
          <h2 className="Hero__presentation__texte">Nous offrons aux entreprises une solution de Digital Learning axée sur l’engagement des utilisateurs, qui inclut une plateforme réunissant une multitude de programmes, et des professeurs dédiés. Nos solutions constament remises à jour sont idéales pour répondre à tous les enjeux de la formation en ligne de vos collaborateurs à grande échelle.</h2>
        </div>
    </div>
  );
};

export default Hero;
