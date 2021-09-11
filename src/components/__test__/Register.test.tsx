import { BrowserRouter } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Register from '../Register';
import axios from 'axios';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('Register Component', () => {
    test('should render the register form', () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.queryByPlaceholderText('Email')).toBeTruthy();
        expect(screen.queryByLabelText('Email')).toBeTruthy();
        expect(screen.queryByPlaceholderText('Username')).toBeTruthy();
        expect(screen.queryByLabelText('Username')).toBeTruthy();
        expect(screen.queryByPlaceholderText('Password')).toBeTruthy();
        expect(screen.queryByLabelText('Password')).toBeTruthy();
        expect(screen.queryByRole('button')?.textContent).toContain('Register');
        expect(screen.getByRole('link')?.textContent).toContain('Login instead?');
    });
    test('should make a request, if form is filled out and register button is clicked', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        const mock = axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Email'), { target: { value: 'some@email.com' } });
            fireEvent.input(await screen.findByLabelText('Username'), { target: { value: 'some.username' } });
            fireEvent.input(await screen.findByLabelText('Password'), { target: { value: 'mysecretpassword' } });
            fireEvent.click(await screen.findByRole('button'));
        });

        expect(mock).toBeCalledWith(
            '/api/user/register',
            { email: 'some@email.com', username: 'some.username', password: 'mysecretpassword' },
            {}
        );
    });
    test('should not make a request, if no email is provided', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        const mock = axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Username'), { target: { value: 'some.username' } });
            fireEvent.input(await screen.findByLabelText('Password'), { target: { value: 'mysecretpassword' } });
            fireEvent.click(await screen.findByRole('button'));
        });

        expect(mock).not.toBeCalled();
    });
    test('should not make a request, if no username is provided', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const accessToken = 'someAccessToken';
        const refreshToken = 'someRefreshToken';
        const mock = axiosMock.post.mockResolvedValue({ data: { accessToken, refreshToken } });
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Email'), { target: { value: 'some@email.com' } });
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
                <Register />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.input(await screen.findByLabelText('Email'), { target: { value: 'some@email.com' } });
            fireEvent.input(await screen.findByLabelText('Username'), { target: { value: 'some.username' } });
            fireEvent.click(await screen.findByRole('button'));
        });

        expect(mock).not.toBeCalled();
    });
});
