import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createPageBrowserRouter } from '../utils/routing'

// Pages
import Landing from '../pages/Landing'

const Router: React.FC = () => {
  const router = createPageBrowserRouter([
    {
      index: true,
      path: '/',
      active: "home",
      element: <Landing />,
    },
    {
      path: "/about",
      active: "about",
      element: (
        <>About page</>
      )
    },
    {
      path: "/blog",
      active: "blog",
      element: (
        <>Blog page</>
      )
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
