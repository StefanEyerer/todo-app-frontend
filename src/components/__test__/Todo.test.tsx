import { fireEvent, render, screen } from '@testing-library/react';
import Todo from '../Todo';

describe('Todo Component', () => {
    test('should render the title and description of an uncompleted todo', () => {
        const removeTodoHandler = jest.fn();
        const toggleCompletedHandler = jest.fn();

        render(
            <Todo
                todo={someUncompletedTodo}
                removeTodoHandler={removeTodoHandler}
                toggleCompletedHandler={toggleCompletedHandler}
            />
        );

        expect(screen.queryByText(someUncompletedTodo.title)).toBeTruthy();
        expect(screen.queryByText(someUncompletedTodo.description)).toBeTruthy();
    });
    test('should render the title and description of a completed todo', () => {
        const removeTodoHandler = jest.fn();
        const toggleCompletedHandler = jest.fn();

        render(
            <Todo
                todo={someCompletedTodo}
                removeTodoHandler={removeTodoHandler}
                toggleCompletedHandler={toggleCompletedHandler}
            />
        );

        expect(screen.queryByText(someCompletedTodo.title)).toBeTruthy();
        expect(screen.queryByText(someCompletedTodo.description)).toBeTruthy();
    });
    test('should call the remove handler, if trash icon is clicked', () => {
        const removeTodoHandler = jest.fn();
        const toggleCompletedHandler = jest.fn();
        render(
            <Todo
                todo={someUncompletedTodo}
                removeTodoHandler={removeTodoHandler}
                toggleCompletedHandler={toggleCompletedHandler}
            />
        );

        fireEvent.click(screen.getByRole('button'));

        expect(removeTodoHandler).toHaveBeenCalledWith(someUncompletedTodo.id);
        expect(toggleCompletedHandler).not.toHaveBeenCalled();
    });
    test('should call the toggle handler, if todo is double clicked', () => {
        const removeTodoHandler = jest.fn();
        const toggleCompletedHandler = jest.fn();
        render(
            <Todo
                todo={someUncompletedTodo}
                removeTodoHandler={removeTodoHandler}
                toggleCompletedHandler={toggleCompletedHandler}
            />
        );

        fireEvent.doubleClick(screen.getByText(someUncompletedTodo.title));

        expect(toggleCompletedHandler).toHaveBeenCalledWith(someUncompletedTodo.id);
        expect(removeTodoHandler).not.toHaveBeenCalled();
    });
});

// Test Data
const someUser = {
    id: '11',
    email: 'some@email.com',
    username: 'some.username'
};
const someUncompletedTodo = {
    id: '12345',
    title: 'Some Title 1',
    description: 'Some Description 1',
    completed: false,
    user: someUser
};
const someCompletedTodo = {
    id: '23456',
    title: 'Some Title 2',
    description: 'Some Description 2',
    completed: true,
    user: someUser
};
