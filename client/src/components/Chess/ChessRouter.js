import React from 'react';
import { useParams, Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Chess from '../../pages/Chess';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ResetPassword from './Auth/ResetPassword';
import Play from './Auth/Play';

const ChessRouter = ({ match }) => {

    const { url } = match;
    return (
       <>
        <Route path={`${url}/`} component={Chess} exact/>
        <Route path={`${url}/login`} component={Login}/>
        <Route path={`${url}/register`} component={Register}/>
        <Route path={`${url}/resetpassword`} component={ResetPassword}/>
        <Route path={`${url}/play`} component={Play}/>
       </>
    );
}

export default ChessRouter;
