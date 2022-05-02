import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom"
import { useAuthToken } from '../../../hooks/authToken';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    
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
