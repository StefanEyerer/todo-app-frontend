import { render, screen } from '@testing-library/react';
import Todos from '../Todos';

describe('Todos Component', () => {
    test('should render all todos', () => {
        const removeTodoHandler = jest.fn();
        const toggleCompletedHandler = jest.fn();

        render(
            <Todos
                todos={someTodos}
                removeTodoHandler={removeTodoHandler}
                toggleCompletedHandler={toggleCompletedHandler}
            />
        );

        expect(screen.queryByText(someTodos[0].title)).toBeTruthy();
        expect(screen.queryByText(someTodos[0].description)).toBeTruthy();
        expect(screen.queryByText(someTodos[1].title)).toBeTruthy();
        expect(screen.queryByText(someTodos[1].description)).toBeTruthy();
    });
    test('should render text, if no todos exist', () => {
        const removeTodoHandler = jest.fn();
        const toggleCompletedHandler = jest.fn();

        render(
            <Todos todos={[]} removeTodoHandler={removeTodoHandler} toggleCompletedHandler={toggleCompletedHandler} />
        );

        expect(screen.queryByText('No Todos!')).toBeTruthy();
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
