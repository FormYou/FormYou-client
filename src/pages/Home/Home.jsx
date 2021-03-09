import './Home.scss';
import Hero from 'components/Hero/Hero';

const Home = () => {

  return (
    <div className="Home">
        <Hero />
        <div className="Home__presentation">
        	<p>Vos collaborateurs méritent la meilleure Learning Experience Platform</p>
        	<p>YouForm offre aux entreprises une solution de Digital Learning axée sur l’engagement des utilisateurs, qui inclut une plateforme et des professeurs dédiés pour répondre à tous les enjeux de formation en ligne à grande échelle.</p>
        	<p>Nous accompagnons vos employés dans la formation continue en ligne</p>
        	<p>FormYou est une entreprise de vente de formations. Différentes entreprises achètent un forfait chez FormYou. Ainsi, leurs employés peuvent s'inscrire à toutes les formations qu'ils souhaitent, sans limite. Le site de FormYou sert à gérer l'ensemble des utilisateurs. 3 catégories d'utilisateurs existent : Admin, Professeur et Étudiant.

Les formations durent une journée. Il existe plusieurs sessions pour chaque formation. Le nombre d'élèves maximum par session est de 20.

Un professeur est assigné à une formation. Il devra donner cours pour toutes les sessions de cette formation.</p>
        </div>
    </div>
  );
};

export default Home;
