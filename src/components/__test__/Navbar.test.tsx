import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('Navbar Component', () => {
    test('should render all links', () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        axiosMock.post.mockResolvedValue({ data: null });
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        expect(screen.queryAllByRole('link')[0]?.textContent).toContain('Home');
        expect(screen.queryAllByRole('link')[1]?.textContent).toContain('Profile');
        expect(screen.queryAllByRole('link')[2]?.textContent).toContain('Logout');
    });
    test('should make a request, if logout link is clicked', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        const mock = axiosMock.post.mockResolvedValue({ data: null });
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        await act(async () => {
            fireEvent.click((await screen.findAllByRole('link'))[2]);
        });

        expect(mock).toHaveBeenCalledWith('/api/user/logout', { refreshToken: '' }, {});
    });
});
