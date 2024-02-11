import { createContext, useState } from "react";

interface AuthContextProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (username: string, password: string) => Promise<unknown>; // Update the return type to Promise<unknown>
    logout: () => void;
}
const AuthContext = createContext<AuthContextProps>({ token: null, setToken: () => null, login: () => Promise.resolve(''), logout: () => null});

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = (username: string, password: string) => {
        // handle in promise
        return new Promise((resolve, reject) => {
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('token', 'VALID-TOKEN');
                setToken('VALID-TOKEN');
                resolve('VALID-TOKEN');
            } else {
                reject('Invalid username or password');
            }
        });
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };