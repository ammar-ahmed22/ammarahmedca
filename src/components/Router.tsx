import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createPageBrowserRouter } from '../utils/routing'

// Pages
import Landing from '../pages/Landing'
import About from '../pages/About'
import Blog from '../pages/Blog'
import Post from '../pages/Post'

const Router: React.FC = () => {
  const router = createPageBrowserRouter([
    {
      index: true,
      path: '/',
      active: 'home',
      title: 'Home',
      element: <Landing />,
    },
    {
      path: '/about',
      active: 'about',
      title: 'About',
      element: <About />,
    },
    {
      path: '/blog',
      active: 'blog',
      title: 'Blog',
      element: <Blog />,
    },
    {
      path: '/blog/:slug',
      active: 'blog',
      element: <Post />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
