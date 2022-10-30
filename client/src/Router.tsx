import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import ChessRouter from "./components/Chess/Routers/ChessRouter";

import Page from "./components/Page/Page";



const Router : React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Page activeNav="home" >
          <Home />
        </Page>
      )
    },
    {
      path: "/about",
      element: (
        <Page activeNav="about" >
          <About />
        </Page>
      )
    },
    {
      path: "/blog",
      element: (
        <Page activeNav="blog">
          <Blog />
        </Page>
      )
    },
    {
      path: "/blog/:postName",
      element: (
        <Page activeNav="blog" >
          <Post />
        </Page>
      ),
      loader: ({ params }) => decodeURIComponent(params.postName ? params.postName : "")
    },
    // needs complete rework
    // {
    //   path: "/chess",
    //   element: <ChessRouter />
    // }
  ])

  return <RouterProvider router={router} />
}

export default Router;