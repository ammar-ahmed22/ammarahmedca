import React, { useEffect, useContext, useState } from 'react';
import { Route, useLocation, Redirect } from "react-router-dom"
import { SecureProvider } from '../Context/SecureContext';
import SecureContext from '../Context/SecureContext';
import Auth from '../utils/auth';
import { useAuthToken } from '../../../hooks/authToken';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    // const { state } = useLocation();
    // const auth = new Auth();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    // const [token, setToken] = useState("");
    const [ authToken ] = useAuthToken();

    useEffect(() => {
        if (authToken){
            console.log({ authToken });
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }

        
    }, [authToken] )
    

    if (isAuthenticated){
        return (
            <Route {...rest} render={ props => (
                
                <Component {...props} />
                
            )}
            />
        );
    }
    else{
        return <Redirect to="/chess/logout"/>
    }
    
}

export default ProtectedRoute;
