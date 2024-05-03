import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createPageBrowserRouter } from '../utils/routing'

// Pages
import Landing from '../pages/Landing'
import About from '../pages/About'

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
      element: <>Blog page</>,
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
