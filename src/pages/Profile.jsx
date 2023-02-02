import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();
  const getStorageEmail = () => {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
  };
  const getlocal = getStorageEmail();

  const clearUser = () => {
    localStorage.clear('user');
    history.push('/');
  };

  return (
    <div>
      <Header
        title="Profile"
        visible={ false }
      />
      <div>
        <p data-testid="profile-email">{ `Usuário: ${getlocal}` }</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          to="/"
          onClick={ () => { clearUser(); } }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}
