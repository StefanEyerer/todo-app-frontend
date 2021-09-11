import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { AuthContext } from '../../AuthContext';

const login = (): void => {};
const logout = (): void => {};

test('Route / should render Login Page, if user is not logged in', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <AuthContext.Provider value={{ loggedIn: false, login, logout }}>
                <App />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    expect(screen.queryByTestId('page-title')?.textContent).toBe('Please Login');
});

test('Route /login should render Login Page, if user is not logged in', () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
            <AuthContext.Provider value={{ loggedIn: false, login, logout }}>
                <App />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    expect(screen.queryByTestId('page-title')?.textContent).toBe('Please Login');
});

test('Route /register should render Register Page, if user is not logged in', () => {
    render(
        <MemoryRouter initialEntries={['/register']}>
            <AuthContext.Provider value={{ loggedIn: false, login, logout }}>
                <App />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    expect(screen.queryByTestId('page-title')?.textContent).toBe('Please Register');
});

test('Route / should render Home Page, if user is logged in', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <AuthContext.Provider value={{ loggedIn: true, login, logout }}>
                <App />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    expect(screen.queryByTestId('page-title')?.textContent).toBe('Home');
});

test('Route /home should render Home Page, if user is logged in', () => {
    render(
        <MemoryRouter initialEntries={['/home']}>
            <AuthContext.Provider value={{ loggedIn: true, login, logout }}>
                <App />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    expect(screen.queryByTestId('page-title')?.textContent).toBe('Home');
});

test('Route /profile should render Profile Page, if user is logged in', () => {
    render(
        <MemoryRouter initialEntries={['/profile']}>
            <AuthContext.Provider value={{ loggedIn: true, login, logout }}>
                <App />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    expect(screen.queryByTestId('page-title')?.textContent).toBe('Profile');
});
