import React, { useContext, useEffect } from 'react';
import { Route, useLocation } from "react-router-dom"
import Play from '../Auth/Play';
import SecureContext from '../Context/SecureContext';
import SecureRoute from './SecureRoute';

const PlayRouter = ({ match }) => {

    const { url } = match;
    const { token, tokenAddedAt, setProperty } = useContext(SecureContext);
    const { state } = useLocation();
    //console.log({ ctx, location });

    useEffect(() => {
        if (state){
            if (state.token){
                console.log(Date.parse(new Date()))
                setProperty("token", state.token);
                setProperty("tokenAddedAt", Date.parse( new Date() ));
            }
        }
    }, [state])

    return (
        <>
            <Route path={`${url}/`} exact render={ props => (
                <SecureRoute>
                    <Play {...props} />
                </SecureRoute>
            )}/>
        </>
    );
}

export default PlayRouter;
