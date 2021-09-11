import { BrowserRouter } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Login from '../Login';
import axios from 'axios';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('Login Component', () => {
    test('should render the login form', () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.queryByPlaceholderText('Username')).toBeTruthy();
        expect(screen.queryByLabelText('Username')).toBeTruthy();
        expect(screen.queryByPlaceholderText('Password')).toBeTruthy();
        expect(screen.queryByLabelText('Password')).toBeTruthy();
        expect(screen.queryByRole('button')?.textContent).toContain('Login');
        expect(screen.queryByRole('link')?.textContent).toContain('Register instead?');
    });
    test('should make a request, if form is filled out and login button is clicked', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        const mock = axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Username'), { target: { value: 'some.username' } });
            fireEvent.input(await screen.findByLabelText('Password'), { target: { value: 'mysecretpassword' } });
            fireEvent.click(await screen.findByRole('button'));
        });

        expect(mock).toHaveBeenCalledWith(
            '/api/user/login',
            { username: 'some.username', password: 'mysecretpassword' },
            {}
        );
    });
    test('should not make a request, if no username is provided', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        const mock = axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Password'), { target: { value: 'mysecretpassword' } });
            fireEvent.click(await screen.findByRole('button'));
        });

        expect(mock).not.toBeCalled();
    });
    test('should not make a request, if no password is provided', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        const mock = axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Username'), { target: { value: 'some.username' } });
            fireEvent.click(await screen.findByRole('button'));
        });

        expect(mock).not.toBeCalled();
    });
});
