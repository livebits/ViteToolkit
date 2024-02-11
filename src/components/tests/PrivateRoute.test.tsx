import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import PrivateRoute from '../PrivateRoute';

test('renders children when user is authenticated', () => {
  const TestComponent = () => <div>Test</div>;

  render(
    <MemoryRouter initialEntries={['/']}>
      <AuthContext.Provider value={{ token: 'VALID-TOKEN', setToken: () => null, login: () => Promise.resolve(''), logout: () => null }}>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <TestComponent />
            </PrivateRoute>
          } />
          <Route path="/login">Login</Route>
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("Test")).toBeInTheDocument();
});

test('redirects to login when user is not authenticated', () => {
  const TestComponent = () => <div>Test</div>;
  const LoginComponent = () => <div>Login</div>;

  render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthContext.Provider value={{ token: "", setToken: () => null, login: () => Promise.resolve(''), logout: () => null }}>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <TestComponent />
            </PrivateRoute>
          } />
          <Route path='/login' Component={LoginComponent} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText('Login')).toBeInTheDocument();
});