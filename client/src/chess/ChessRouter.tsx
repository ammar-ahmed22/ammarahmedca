import React from "react";
import { Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Page from "../components/Page/Page";

import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";

export const chessRoutes : RouteObject[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "play",
    element: <Game />
  },
  {
    path: "login",
    element: <Login />
  }
]

const ChessRouter : React.FC = () => {

  return (
    <Page activeNav="chess">
      <Outlet />
    </Page>
  )

}

export default ChessRouter;