import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../components/Header';
import renderWithRouterAndRedux from './helpers/renderWith';

const PROFILE = /profile-top-btn/i;
const SEARCH_BTN = /search-top-btn/i;
const SEARCH_INPUT = 'search-input';

describe('Testando componente Header', () => {
  it('Testando componentes presentes no Header', async () => {
    renderWithRouterAndRedux(<Header />);
    const iconPerfil = screen.getByTestId(PROFILE);
    const iconSearch = screen.getByTestId(SEARCH_BTN);
    const title = screen.getByTestId(/page-title/i);
    expect(iconPerfil).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('Testando o redirect de profile', () => {
    const { history } = renderWithRouterAndRedux(<Header />);
    const iconPerfil = screen.getByTestId(PROFILE);
    userEvent.click(iconPerfil);
    waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  });
  it('Testando as funcionalidades de Search', async () => {
    renderWithRouterAndRedux(<Header />);
    const iconSearch = screen.getByTestId(SEARCH_BTN);
    userEvent.click(iconSearch);
    const searchBox = screen.getByTestId(SEARCH_INPUT);
    expect(searchBox).toBeInTheDocument();
    userEvent.click(iconSearch);
    expect(searchBox).not.toBeInTheDocument();
  });
});
