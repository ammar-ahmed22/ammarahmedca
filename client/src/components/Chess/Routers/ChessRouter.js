import React from 'react';
import { Route } from 'react-router-dom';
import Chess from '../../../pages/Chess';
import Login from '../AuthComponents/Login';
import Register from '../AuthComponents/Register';
import ResetPassword from '../AuthComponents/ResetPassword';
import Logout from '../AuthComponents/Logout';
import SecureRouter from './SecureRouter';

const ChessRouter = ({ match }) => {

    const { url } = match;
    return (
       <>
        <Route path={`${url}/`} component={Chess} exact/>
        <Route path={`${url}/login`} component={Login}/>
        <Route path={`${url}/register`} component={Register}/>
        <Route path={`${url}/resetpassword`} component={ResetPassword}/>
        <Route path={`${url}/logout`} component={Logout}/>
        <Route path={`${url}/secure`} component={SecureRouter} />
       </>
    );
}

export default ChessRouter;
