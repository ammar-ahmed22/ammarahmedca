import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
// import ChessRouter from "./components/Chess/Routers/ChessRouter";

import ChessRouter from "./chess/ChessRouter";
import { chessRoutes } from "./chess/ChessRouter";

import Page from "./components/Page/Page";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Page activeNav="home" pageTitle="Home">
          <Home />
        </Page>
      ),
    },
    {
      path: "/about",
      element: (
        <Page activeNav="about" pageTitle="About">
          <About />
        </Page>
      ),
    },
    {
      path: "/blog",
      element: (
        <Page activeNav="blog" pageTitle="Blog">
          <Blog />
        </Page>
      ),
    },
    {
      path: "/blog/:category",
      element: (
        <Page activeNav="blog" pageTitle="Blog">
          <Blog />
        </Page>
      ),
    },
    {
      path: "/blog/:category/:slug",
      element: (
        <Page activeNav="blog" pageTitle="">
          <Post />
        </Page>
      ),
    },
    {
      path: "/chess",
      element: <ChessRouter />,
      children: chessRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
