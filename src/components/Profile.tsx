import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import HttpClient from '../http/http-client';
import { User } from '../models/api/response';

export default function Profile(): JSX.Element {
    const [http] = useState(HttpClient.getInstance());
    const [user, setUser] = useState<User>();

    useEffect(() => {
        requestUser();
    }, []);

    const requestUser = async (): Promise<void> => {
        const response = await http.get<null, User>({ url: '/api/user/profile', requiresAuth: true });
        if (response.success && response.data) {
            setUser(response.data);
        } else {
            toast.error('User could not be retrieved!');
        }
    };

    return (
        <div className="container">
            <h2 data-testid="page-title" className="mb-3">
                Profile
            </h2>
            <div className="card" style={{ width: '40%' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="./user.png" alt="Profile Picture" width="100%" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title">User Info</h4>
                            <h6 className="card-text">
                                Username: <span>{user ? user.username : ''}</span>
                            </h6>
                            <h6 className="card-text">
                                Email: <span>{user ? user.email : ''}</span>
                            </h6>
                            <p className="card-text">
                                <small className="text-muted">Currently you cannot edit your profile.</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
