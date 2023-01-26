import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      <div>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            type="text"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ handClickStorage }
        >
          Enter
        </button>
      </div>
    </div>
  );
}
