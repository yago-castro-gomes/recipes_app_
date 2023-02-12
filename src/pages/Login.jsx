import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import logo from '../images/Recipeylogin.png';

export default function Login() {
  const [emailLogin, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const SIX = 6;
    const emailValidation = emailRegex.test(emailLogin);
    const passwordValidation = password.length > SIX;

    if (emailValidation && passwordValidation) {
      setIsDisabled(false);
    }
  }, [emailLogin, password]);

  const handClickStorage = () => {
    localStorage.setItem('user', JSON
      .stringify({ email: emailLogin }));
    history.push('/meals');
  };
  return (
    <div id="login-bg">
      <div className="container">
        <div className="imgConfg">
          <img src={ logo } className="app-logo" alt="logo" />
        </div>
        {/* <div><img src={ titleRecipe } className="title-logo" alt="logoName" /></div> */}
        <div className="container-form">
          <h6 id="login-title">Login</h6>
          <label htmlFor="email-input">
            <input
              type="email"
              data-testid="email-input"
              placeholder="E-mail"
              className="input-position"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <br />
          <label htmlFor="password-input">
            <input
              type="password"
              data-testid="password-input"
              placeholder="Password"
              className="input-position"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          <button
            disabled={ isDisabled }
            type="submit"
            data-testid="login-submit-btn"
            className="btn-form"
            onClick={ handClickStorage }
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
