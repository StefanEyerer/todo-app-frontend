import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../../App';
import PrivateRoutes from '../../PrivateRoutes';
import PublicRoutes from '../../PublicRoutes';
import AddTodo from '../AddTodo';
import Home from '../Home';
import Login from '../Login';
import Navbar from '../Navbar';
import Profile from '../Profile';
import Register from '../Register';
import Todo from '../Todo';
import Todos from '../Todos';

test('App Component should render', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
});

test('PrivateRoutes Component should render', () => {
    render(
        <BrowserRouter>
            <PrivateRoutes />
        </BrowserRouter>
    );
});

test('PublicRoutes Component should render', () => {
    render(
        <BrowserRouter>
            <PublicRoutes />
        </BrowserRouter>
    );
});

test('AddTodo Component should render', () => {
    const addTodoHandler = jest.fn();
    render(<AddTodo addTodoHandler={addTodoHandler} />);
});

test('Home Component should render', () => {
    render(<Home />);
});

test('Login Component should render', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
});

test('Navbar Component should render', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
});

test('Profile Component should render', () => {
    render(<Profile />);
});

test('Register Component should render', () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
});

test('Todo Component should render', () => {
    const removeTodoHandler = jest.fn();
    const toggleCompletedHandler = jest.fn();
    render(
        <Todo todo={sampleTodo} removeTodoHandler={removeTodoHandler} toggleCompletedHandler={toggleCompletedHandler} />
    );
});

test('Todos Component should render', () => {
    const removeTodoHandler = jest.fn();
    const toggleCompletedHandler = jest.fn();
    render(
        <Todos
            todos={[sampleTodo]}
            removeTodoHandler={removeTodoHandler}
            toggleCompletedHandler={toggleCompletedHandler}
        />
    );
});

// Test Data
const sampleTodo = {
    id: '12345',
    title: 'Some Title',
    description: 'Some Description',
    completed: false,
    user: {
        id: '6789',
        email: 'sample@email.com',
        username: 'some.username'
    }
};
