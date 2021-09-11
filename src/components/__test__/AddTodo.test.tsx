import { fireEvent, render, screen } from '@testing-library/react';
import AddTodo from '../AddTodo';

describe('AddTodo Component', () => {
    test('should render the add todo form', () => {
        const addTodoHandler = jest.fn();

        render(<AddTodo addTodoHandler={addTodoHandler} />);

        expect(screen.queryByPlaceholderText('Title')).toBeTruthy();
        expect(screen.queryByLabelText('Title')).toBeTruthy();
        expect(screen.queryByPlaceholderText('Description')).toBeTruthy();
        expect(screen.queryByLabelText('Description')).toBeTruthy();
        expect(screen.queryByRole('button')?.textContent).toBe('Add');
    });
    test('should call the add handler, if a todo is added', () => {
        const addTodoHandler = jest.fn();
        render(<AddTodo addTodoHandler={addTodoHandler} />);

        fireEvent.input(screen.getByLabelText('Title'), { target: { value: 'SomeTitle' } });
        fireEvent.input(screen.getByLabelText('Description'), { target: { value: 'SomeDescription' } });
        fireEvent.click(screen.getByText('Add'));

        expect(addTodoHandler).toBeCalledWith({ title: 'SomeTitle', description: 'SomeDescription' });
    });
    test('should not call the add handler, if no title is provided', () => {
        const addTodoHandler = jest.fn();
        render(<AddTodo addTodoHandler={addTodoHandler} />);

        fireEvent.input(screen.getByLabelText('Description'), { target: { value: 'SomeDescription' } });
        fireEvent.click(screen.getByText('Add'));

        expect(addTodoHandler).not.toHaveBeenCalled();
    });
    test('should not call the add handler, if no description is provided', () => {
        const addTodoHandler = jest.fn();
        render(<AddTodo addTodoHandler={addTodoHandler} />);

        fireEvent.input(screen.getByLabelText('Title'), { target: { value: 'SomeTitle' } });
        fireEvent.click(screen.getByText('Add'));

        expect(addTodoHandler).not.toHaveBeenCalled();
    });
});
