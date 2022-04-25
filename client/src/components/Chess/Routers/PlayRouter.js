import React, { useContext, useEffect } from 'react';
import { Route, useLocation } from "react-router-dom"
import Play from '../Auth/Play';
import SecureContext from '../Context/SecureContext';

const PlayRouter = ({ match }) => {

    const { url } = match;
    const ctx = useContext(SecureContext);
    const location = useLocation();
    //console.log({ ctx, location });

    // useEffect(() => {
    //     console.log({ ctx, location })
    // }, [ctx, location])

    return (
        <>
            <Route path={`${url}/`} exact component={Play}/>
        </>
    );
}

export default PlayRouter;
