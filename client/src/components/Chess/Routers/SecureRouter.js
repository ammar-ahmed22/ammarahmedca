import React, { useContext, useEffect } from 'react';
import { Route, useLocation } from "react-router-dom"
import Play from '../AuthComponents/Play';
import SecureContext from '../Context/SecureContext';
import SecureRoute from './SecureRoute';
import CompleteProfile from '../AuthComponents/CompleteProfile';
import ProtectedRoute from './ProtectedRoute';

const SecureRouter = ({ match }) => {

    const { url } = match;
    // const { setProperty } = useContext(SecureContext);
    // const { state: { token } } = useLocation();
    // //console.log({ ctx, location });

    // useEffect(() => {
    //     if (token){
            
    //         // console.log(Date.parse(new Date()))
    //         console.log("UPDATING TOKEN")
    //         setProperty("token", token);
    //         setProperty("tokenAddedAt", Date.parse( new Date() ));
            
    //     }
    // }, [token])

    return (
        <>
            {/* <Route path={`${url}/`} exact render={ props => (
                <SecureRoute>
                    <Play {...props} />
                </SecureRoute>
            )}/>
            <Route path={`${url}/completeprofile`} render={ props => (
                <SecureRoute>
                    <CompleteProfile {...props} />
                </SecureRoute>
            )}/> */}
            <ProtectedRoute path={`${url}/`} exact component={Play} />
            <ProtectedRoute path={`${url}/completeprofile`} component={CompleteProfile} />
        </>
    );
}

export default SecureRouter;
