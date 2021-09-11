import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Todos from './Todos';
import AddTodo from './AddTodo';
import HttpClient from '../http/http-client';
import { CreateTodoRequest, UpdateTodoRequest } from '../models/api/request';
import { Todo, TodoList } from '../models/api/response';

export default function Home(): JSX.Element {
    const [http] = useState(HttpClient.getInstance());
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        requestTodos();
    }, []);

    const requestTodos = async (): Promise<void> => {
        const response = await http.get<null, TodoList>({ url: '/api/todo', requiresAuth: true });
        if (response.success && response.data) {
            setTodos([...response.data.items]);
        } else {
            toast.error('Todos could not be retrieved!');
        }
    };

    const addTodoHandler = async (todo: { title: string; description: string }): Promise<void> => {
        const response = await http.post<CreateTodoRequest, Todo>({
            url: '/api/todo',
            requiresAuth: true,
            data: { title: todo.title, description: todo.description, completed: false }
        });
        if (response.success && response.data) {
            setTodos([...todos, { ...response.data }]);
            toast.info('New Todo has been created!');
        } else {
            toast.error('Todo could not be created!');
        }
    };

    const removeTodoHandler = async (id: string): Promise<void> => {
        const response = await http.delete<null, Todo>({ url: `/api/todo/${id}`, requiresAuth: true });
        if (response.success && response.data) {
            setTodos(todos.filter((todo) => todo.id !== id));
            toast.info('Todo has been removed!');
        } else {
            toast.error('Todo could not be deleted!');
        }
    };

    const toggleCompletedHandler = async (id: string): Promise<void> => {
        const currentTodo = todos.find((todo) => todo.id === id);
        const response = await http.put<UpdateTodoRequest, Todo>({
            url: `/api/todo/${id}`,
            requiresAuth: true,
            data: { completed: !currentTodo?.completed }
        });
        if (response.success && response.data) {
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, completed: !todo.completed };
                    } else {
                        return todo;
                    }
                })
            );
            toast.info('Todo has been updated!');
        } else {
            toast.error('Todo could not be updated!');
        }
    };

    return (
        <div className="container">
            <h2 data-testid="page-title" className="mb-3">
                Home
            </h2>
            <div className="row">
                <div className="col-md-8 border-end border-secondary">
                    <Todos
                        todos={todos}
                        removeTodoHandler={removeTodoHandler}
                        toggleCompletedHandler={toggleCompletedHandler}
                    />
                </div>
                <div className="col-md-4 border-start border-secondary">
                    <AddTodo addTodoHandler={addTodoHandler} />
                </div>
            </div>
        </div>
    );
}
