import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

export default function PublicRoutes(): JSX.Element {
    return (
        <>
            <div className="container-fluid">
                <Switch>
                    <Route path="/login" render={(): JSX.Element => <Login />} />
                    <Route path="/register" render={(): JSX.Element => <Register />} />
                    <Route path="/" render={(): JSX.Element => <Redirect to="/login" />} />
                </Switch>
            </div>
        </>
    );
}
