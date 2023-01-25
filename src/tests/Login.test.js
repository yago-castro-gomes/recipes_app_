import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testando componente Login', () => {
  it('Testando os inputs E-mail e Password', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const textEmail = screen.getByText(/Email/i);
    const textPassword = screen.getByText(/Password/i);
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByTestId(/login-submit-btn/i);
    expect(textEmail).toBeInTheDocument();
    expect(textPassword).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const email = 'test@test.com.br';
    const password = '12345678';
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    expect(button).toBeEnabled();
    userEvent.click(button);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals');
    });
  });
});
