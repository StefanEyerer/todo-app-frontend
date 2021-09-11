import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

export default function PrivateRoutes(): JSX.Element {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <Switch>
                    <Route path="/home" render={(): JSX.Element => <Home />} />
                    <Route path="/profile" render={(): JSX.Element => <Profile />} />
                    <Route path="/" render={(): JSX.Element => <Redirect to="/home" />} />
                </Switch>
            </div>
        </>
    );
}
