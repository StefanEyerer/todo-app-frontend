import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext';
import HttpClient from '../http/http-client';
import { LogoutUserRequest } from '../models/api/request';

export default function Navbar(): JSX.Element {
    const authContext = useContext(AuthContext);
    const [http] = useState(HttpClient.getInstance());

    const logout = async (): Promise<void> => {
        const response = await http.post<LogoutUserRequest, null>({
            url: '/api/user/logout',
            requiresAuth: false,
            data: { refreshToken: http.getTokens().refreshToken }
        });
        if (response.success) {
            authContext.logout();
            toast.success('You successfully logged out!');
        } else {
            toast.error('Logout was not successful!');
        }
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">
                    Home
                </Link>

                <ul className="navbar-nav mt-1 mb-1">
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
                            <i className="bi bi-person-fill"></i> Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" onClick={logout}>
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
