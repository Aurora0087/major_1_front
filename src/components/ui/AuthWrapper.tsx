import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

interface AuthWrapperProps {
    children: React.ReactNode;
}

function AuthWrapper({ children }:AuthWrapperProps) {

    const router = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        axios.get("/api/auth")
            .then((res) => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
                router("/");
            });
    }, [router]);

    if (isAuthenticated === null) {
        return <div className=' w-full h-full grid place-content-center text-slate-500 text-3xl font-semibold'>Loading...</div>;
    }

    return (
        <div className=' w-full relative'>
            {isAuthenticated && children}
        </div>
    );
}

export default AuthWrapper