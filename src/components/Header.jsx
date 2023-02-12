import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';
import logo from '../assets/Recipey420.png';

export function Header({ title, visible, logoimg }) {
  const history = useHistory();
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearch = () => {
    setSearchVisible(true);
    if (searchVisible) {
      setSearchVisible(false);
    }
  };
  const handProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      <div className="header-container">
        <div>
          <img src={ logo } alt="" width="20%" id="logo-header" />
        </div>
        <div>
          <button
            type="button"
            onClick={ handProfile }
            className="button-header"
          >
            <img
              src={ profile }
              data-testid="profile-top-btn"
              alt="profile"
              className="icon-header"
            />
          </button>
        </div>
        <div>
          {visible && (
            <div>
              <div>
                <button
                  type="button"
                  onClick={ handleSearch }
                  className="button-header"
                >
                  <img
                    src={ search }
                    data-testid="search-top-btn"
                    alt="search"
                    className="icon-header"
                    id="search-icon"
                  />
                </button>
              </div>
              {searchVisible && (
                <div>
                  <SearchBar />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        data-testid="page-title"
        className="title-page"
      >
        <img src={ logoimg } alt="" width="8%" />
        {title}

      </div>
    </div>

  );
}

Header.defaultProps = {
  visible: true,
};

Header.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
}.isRequired;
