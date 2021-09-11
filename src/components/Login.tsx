import { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext';
import HttpClient from '../http/http-client';
import { LoginUserRequest } from '../models/api/request';

type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

export default function Login(): JSX.Element {
    const authContext = useContext(AuthContext);
    const [http] = useState(HttpClient.getInstance());
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [wasValidated, setWasValidated] = useState(false);

    const login = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target as HTMLFormElement;
        if (form.checkValidity()) {
            setWasValidated(false);
            const response = await http.post<LoginUserRequest, LoginResponse>({
                url: '/api/user/login',
                requiresAuth: false,
                data: { username, password }
            });
            if (response.success && response.data) {
                setUsername('');
                setPassword('');
                authContext.login(response.data);
                toast.success('You successfully logged in!');
            } else {
                toast.error('Login was not successful!');
            }
        } else {
            setWasValidated(true);
        }
    };

    return (
        <div className="container text-center w-25 mt-5">
            <h3 data-testid="page-title" className="mb-3">
                Please Login
            </h3>
            <form className={wasValidated ? 'was-validated' : ''} onSubmit={(e): Promise<void> => login(e)} noValidate>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="inputUsername"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e): void => setUsername(e.target.value)}
                        required
                        autoFocus
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
                    <i className="bi bi-box-arrow-in-right"></i> Login
                </button>
            </form>
            <Link to="/register" style={{ marginTop: '10px', textDecoration: 'none' }}>
                Register instead?
            </Link>
        </div>
    );
}
