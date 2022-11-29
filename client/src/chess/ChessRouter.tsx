import React from "react";
import { Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Page from "../components/Page/Page";
import AuthorizedRoute from "./components/AuthorizedRoute";

import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";

export const chessRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "play",
    element: (
      <AuthorizedRoute>
        <Game />
      </AuthorizedRoute>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "confirm-email",
    element: (
      <AuthorizedRoute>
        <ConfirmEmail />
      </AuthorizedRoute>
    ),
  },
  {
    path: "spinner-test",
    element: <Loading />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "profile",
    element: (
      <AuthorizedRoute>
        <Profile />
      </AuthorizedRoute>
    ),
  },
];

const ChessRouter: React.FC = () => {
  return (
    <Page activeNav="chess">
      <Outlet />
    </Page>
  );
};

export default ChessRouter;
