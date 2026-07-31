"use client";

import {

    createContext,

    useContext,

    useEffect,

    useState,

    ReactNode,

} from "react";

import authService from "@/services/auth.service";

interface AuthContextType {

    user: any;

    loading: boolean;

    login: (data: any) => Promise<void>;

    logout: () => void;

    isAuthenticated: boolean;

}

const AuthContext = createContext<AuthContextType>(

    {} as AuthContextType

);

export function AuthProvider({

    children,

}: {

    children: ReactNode;

}) {

    const [user, setUser] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const currentUser = authService.getUser();

        if (currentUser) {

            setUser(currentUser);

        }

        setLoading(false);

    }, []);

    async function login(data: any) {

        const response = await authService.login(data);

        authService.saveSession(response.data);

        setUser(response.data.user);

    }

    function logout() {

        authService.logout();

        setUser(null);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                logout,

                isAuthenticated: !!user,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}