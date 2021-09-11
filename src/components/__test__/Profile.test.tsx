import { act, render, screen } from '@testing-library/react';
import Profile from '../Profile';
import axios from 'axios';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('Profile Component', () => {
    test('should render the user info', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        axiosMock.get.mockResolvedValue({ data: someUser });

        await act(async () => {
            render(<Profile />);
        });

        expect(screen.queryByText(someUser.email)).toBeTruthy();
        expect(screen.queryByText(someUser.username)).toBeTruthy();
    });
});

// Test Data
const someUser = {
    id: '11',
    email: 'some@email.com',
    username: 'some.username'
};
