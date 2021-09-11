import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import 'react-toastify/dist/ReactToastify.css';

export default function App(): JSX.Element {
    const authContext = useContext(AuthContext);

    return (
        <>
            <ToastContainer autoClose={3000} pauseOnFocusLoss={false} pauseOnHover={false} />
            <Route path="/" render={(): JSX.Element => (authContext.loggedIn ? <PrivateRoutes /> : <PublicRoutes />)} />
        </>
    );
}
