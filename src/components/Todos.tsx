import { Todo as TodoModel } from '../models/api/response';
import Todo from './Todo';

type TodosProps = {
    todos: TodoModel[];
    removeTodoHandler: (id: string) => void;
    toggleCompletedHandler: (id: string) => void;
};

export default function Todos({ todos, removeTodoHandler, toggleCompletedHandler }: TodosProps): JSX.Element {
    return (
        <div className="pe-2">
            <h4 className="mb-4">My todos</h4>
            {todos.length ? (
                todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        removeTodoHandler={removeTodoHandler}
                        toggleCompletedHandler={toggleCompletedHandler}
                    />
                ))
            ) : (
                <p>No Todos!</p>
            )}
        </div>
    );
}
