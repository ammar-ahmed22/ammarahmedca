import React from "react";
import { useGetUser } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import AuthContextProvider from "../contexts/AuthContext";
import Loading from "../components/Loading";

interface AuthorizedRouteProps{
  children: React.ReactNode,
  redirectPath?: string
}

const AuthorizedRoute : React.FC<AuthorizedRouteProps> = ({ children, redirectPath }) => {

  const { user, loading, error } = useGetUser();

  if (loading){
    return <Loading />
  }

  if ((!user || error)){
    return <Navigate to={redirectPath ?? "/chess/login"} />
  }

  // Route to /chess/confirm-email after register (authorized)
  // if they bypass this by closing the page after initial register and logging in, show a popup at the top saying
  // email is not confirmed.
  // Don't allow starting game until email is confirmed
  //
  // if (!user.emailConfirmed){
  //   return <Navigate to="/chess/confirm-email" />
  // }

  return (
    <AuthContextProvider user={user}>
      {
        children
      }
    </AuthContextProvider>
  )
}

export default AuthorizedRoute;