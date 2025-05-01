import { createContext } from "react";

interface AuthContextProps {
    user: { user: UserType } | undefined;
    token: string | undefined;
    isAuthenticated: boolean;
    login: (userData: UserType, tokenData: TokenData) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    token: undefined,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});
