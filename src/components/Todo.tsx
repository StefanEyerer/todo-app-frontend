import { Todo as TodoModel } from '../models/api/response';

type TodoProps = {
    todo: TodoModel;
    removeTodoHandler: (id: string) => void;
    toggleCompletedHandler: (id: string) => void;
};

export default function Todo({ todo, removeTodoHandler, toggleCompletedHandler }: TodoProps): JSX.Element {
    const removeTodo = (): void => {
        removeTodoHandler(todo.id);
    };

    const toggleCompleted = (): void => {
        toggleCompletedHandler(todo.id);
    };

    return (
        <div className="border border-secondary rounded mb-2 p-2" onDoubleClick={toggleCompleted}>
            <div className="d-flex w-100 justify-content-between mb-2">
                <h5 className={todo.completed ? 'text-decoration-line-through' : ''}>{todo.title}</h5>
                <button className="btn btn-sm btn-outline-danger" onClick={removeTodo}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
            <p className="text-break text-wrap mb-2 pe-5">{todo.description}</p>
        </div>
    );
}
