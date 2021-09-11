import { act, render, screen } from '@testing-library/react';
import Home from '../Home';
import axios from 'axios';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('Home Component', () => {
    test('should render all todos', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        axiosMock.get.mockResolvedValue({ data: { items: someTodos } });

        await act(async () => {
            render(<Home />);
        });

        expect(screen.queryByText(someTodos[0].title)).toBeTruthy();
        expect(screen.queryByText(someTodos[0].description)).toBeTruthy();
        expect(screen.queryByText(someTodos[1].title)).toBeTruthy();
        expect(screen.queryByText(someTodos[1].description)).toBeTruthy();
    });
    test('should render the form to add a todo', async () => {
        axiosMock.create.mockImplementation(() => axiosMock);
        axiosMock.get.mockResolvedValue({ data: { items: [] } });

        await act(async () => {
            render(<Home />);
        });

        expect(screen.queryByPlaceholderText('Title')).toBeTruthy();
        expect(screen.queryByLabelText('Title')).toBeTruthy();
        expect(screen.queryByPlaceholderText('Description')).toBeTruthy();
        expect(screen.queryByLabelText('Description')).toBeTruthy();
        expect(screen.queryByRole('button')?.textContent).toBe('Add');
    });
});

// Test Data
const someUser = {
    id: '11',
    email: 'some@email.com',
    username: 'some.username'
};
const someTodos = [
    {
        id: '12345',
        title: 'Some Title 1',
        description: 'Some Description 1',
        completed: false,
        user: someUser
    },
    {
        id: '23456',
        title: 'Some Title 2',
        description: 'Some Description 2',
        completed: true,
        user: someUser
    }
];
