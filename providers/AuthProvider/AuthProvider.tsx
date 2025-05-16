"use client";

import { FC, ReactNode, useEffect, useState, useTransition } from "react";
import { AuthContext } from "./AuthContext";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { currentUser } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { authConfig } from "./config/auth.config";

interface AuthProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [isClient, setIsClient] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const [isPending, setTransition] = useTransition();

    const publicPathnames = ["/reset-password", "/verify-email"];

    // Safely access localStorage after hydration
    useEffect(() => {
        setIsClient(true);
        const storedToken = JSON.parse(
            localStorage.getItem(authConfig.tokenName) ?? "{}"
        );
        if (storedToken.token) {
            setToken(storedToken.token);
        }
    }, []);

    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["current-user"],
        queryFn: () => currentUser(token!),
        enabled: !!token,
        retry: false,
    });

    const isAuthenticated = !!user && !!token;

    const redirectTo = (url: string) => {
        setTransition(() => router.push(url));
    };

    const redirectToSignIn = () => {
        redirectTo(authConfig.pages.signIn);
    };

    const redirectToDashboard = (isAdmin: boolean) => {
        if (isAdmin) return redirectTo(authConfig.pages.dashboard);
    };

    useEffect(() => {
        if (!isClient) return;

        const storedToken = JSON.parse(
            localStorage.getItem(authConfig.tokenName) ?? "{}"
        );
        const isPublicPathname = publicPathnames.some((path) =>
            pathname.startsWith(path)
        );

        if (!isPublicPathname) {
            if (isError && pathname !== authConfig.pages.signIn) {
                redirectToSignIn();
            } else {
                if (storedToken.token) {
                    if (user && !user.user.isActive) {
                        logout();
                    }
                    if (user && pathname === authConfig.pages.signIn) {
                        redirectToDashboard(user.user.isAdmin);
                    }
                } else if (pathname !== authConfig.pages.signIn) {
                    redirectToSignIn();
                }
            }
        }
    }, [user, router, pathname, isError, isClient]);

    // Handle data refetching on navigation
    useEffect(() => {
        const isPublicPathname = publicPathnames.some((path) =>
            pathname.startsWith(path)
        );
        if (token && !isPublicPathname) {
            refetch();
        }
    }, [pathname, token]);

    const login = (userData: UserType, tokenData: TokenData) => {
        localStorage.setItem(authConfig.tokenName, JSON.stringify(tokenData));
        setToken(tokenData.token);
        queryClient.setQueryData(["current-user"], userData);
        redirectToDashboard(userData.isAdmin);
    };

    const logout = () => {
        localStorage.removeItem(authConfig.tokenName);
        setToken(undefined);
        queryClient.removeQueries({ queryKey: ["current-user"] });
        redirectToSignIn();
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout }}
        >
            {isPending || isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
