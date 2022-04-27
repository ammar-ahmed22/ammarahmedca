import React from 'react';
import Play from '../AuthComponents/Play';
import CompleteProfile from '../AuthComponents/CompleteProfile';
import ProtectedRoute from './ProtectedRoute';

const SecureRouter = ({ match }) => {

    const { url } = match;

    return (
        <>
            <ProtectedRoute path={`${url}/`} exact component={Play} />
            <ProtectedRoute path={`${url}/completeprofile`} component={CompleteProfile} />
        </>
    );
}

export default SecureRouter;
