import React from 'react';

export const AuthContext = React.createContext({
    loggedIn: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (tokens: { accessToken: string; refreshToken: string }) => {
        return;
    },
    logout: () => {
        return;
    }
});
