import React, { useContext, useEffect, useState } from 'react';
import SecureContext from '../Context/SecureContext';
import { Redirect } from "react-router-dom";

const SecureRoute = ({ children }) => {
    const { token, tokenAddedAt, setProperty } = useContext(SecureContext);

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useEffect(() => {
        if (token && tokenAddedAt){
            const oneDay = 24 * 60 * 60 * 1000;
            const now = Date.parse(new Date());
            if (now > (tokenAddedAt + oneDay)){
                setIsAuthenticated(false);
            }
        }else{
            setIsAuthenticated(true);
        }

        if (!isAuthenticated){
            setProperty("token", null);
            setProperty("tokenAddedAt", null);
        }

    }, [isAuthenticated])

    if (isAuthenticated){
        return (
            <>
            {
                children
            }
            </>
        );
    }else{
        return <Redirect to="/chess/logout" />
    }
    
}

export default SecureRoute;
