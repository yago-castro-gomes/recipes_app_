import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

export function Header({ title, visible }) {
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
      <div
        data-testid="page-title"
      >
        {title}

      </div>
      <div>
        <button
          type="button"
          onClick={ handProfile }
        >
          <img
            src={ profile }
            data-testid="profile-top-btn"
            alt="profile"
          />
        </button>
      </div>
      <br />
      <div>
        {visible && (
          <div>
            <div>
              <button
                type="button"
                onClick={ handleSearch }
              >
                <img
                  src={ search }
                  data-testid="search-top-btn"
                  alt="search"
                />
              </button>
            </div>
            {searchVisible && (
              <div>
                <input
                  type="text"
                  data-testid="search-input"
                />
              </div>
            )}
          </div>
        )}
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
