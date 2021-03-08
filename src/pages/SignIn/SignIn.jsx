import './SignIn.scss';

const SignIn = () => {

  return (
    <div className="SignIn">
        <h1 className="SignIn__title">Se connecter</h1>
        <form className="SignIn__form">
        	<input className="SignIn__form__email" type="email" name="email" placeholder="email" />
        	<input className="SignIn__form__password" type="password" name="password" placeholder="password" />
        	<input className="SignIn__form__submit" type="submit" />
        </form>
    </div>
  );
};

export default SignIn;
