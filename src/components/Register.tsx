import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import HttpClient from '../http/http-client';
import { RegisterUserRequest } from '../models/api/request';
import { User } from '../models/api/response';

export default function Register(): JSX.Element {
    const [http] = useState(HttpClient.getInstance());
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [wasValidated, setWasValidated] = useState(false);
    const history = useHistory();

    const register = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target as HTMLFormElement;
        if (form.checkValidity()) {
            setWasValidated(false);
            const response = await http.post<RegisterUserRequest, User>({
                url: '/api/user/register',
                requiresAuth: false,
                data: {
                    email,
                    username,
                    password
                }
            });
            if (response.success && response.data) {
                setEmail('');
                setUsername('');
                setPassword('');
                history.push('/login');
                toast.success('You successfully registered!');
            } else {
                toast.error('Register was not successful!');
            }
        } else {
            setWasValidated(true);
        }
    };

    return (
        <div className="container text-center w-25 mt-5">
            <h3 data-testid="page-title" className="mb-3">
                Please Register
            </h3>
            <form
                className={wasValidated ? 'was-validated' : ''}
                onSubmit={(e): Promise<void> => register(e)}
                noValidate
            >
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e): void => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                    <label htmlFor="inputEmail">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="inputUsername"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e): void => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="inputUsername">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e): void => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="inputPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                    <i className="bi bi-box-arrow-up-right"></i> Register
                </button>
            </form>
            <Link to="/login" style={{ textDecoration: 'none' }}>
                Login instead?
            </Link>
        </div>
    );
}
