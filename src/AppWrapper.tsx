import { useState } from 'react';
import HttpClient from './http/http-client';
import App from './App';
import { AuthContext } from './AuthContext';

export default function AppWrapper(): JSX.Element {
    const [http] = useState(HttpClient.getInstance());
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (tokens: { accessToken: string; refreshToken: string }): void => {
        http.setTokens(tokens.accessToken, tokens.refreshToken);
        setLoggedIn(true);
    };

    const logout = (): void => {
        http.setTokens('', '');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            <App />
        </AuthContext.Provider>
    );
}
