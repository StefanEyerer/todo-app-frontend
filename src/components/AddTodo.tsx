import { FormEvent, useState } from 'react';

type AddTodoProps = {
    addTodoHandler: (todo: { title: string; description: string }) => void;
};

export default function AddTodo({ addTodoHandler }: AddTodoProps): JSX.Element {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [wasValidated, setWasValidated] = useState(false);

    const addTodo = (e: FormEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target as HTMLFormElement;
        if (form.checkValidity()) {
            addTodoHandler({ title, description });
            setTitle('');
            setDescription('');
            setWasValidated(false);
        } else {
            setWasValidated(true);
        }
    };

    return (
        <div className="ps-2">
            <h4 className="mb-4">Add new todo</h4>
            <form className={wasValidated ? 'was-validated' : ''} onSubmit={(e): void => addTodo(e)} noValidate>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="inputTitle"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e): void => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="inputTitle">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="inputDescription"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e): void => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="inputDescription">Description</label>
                </div>
                <button type="submit" className="btn btn-secondary w-100 mb-3">
                    Add
                </button>
            </form>
        </div>
    );
}
