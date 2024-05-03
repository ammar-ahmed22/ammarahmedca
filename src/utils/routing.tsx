import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Page from '../components/Page'

export type DOMRouterOpts = Parameters<typeof createBrowserRouter>[1]
export type PageRouteObject = RouteObject & {
  element: React.ReactNode
  active?: string
}

export const createPageBrowserRouter = (
  routes: PageRouteObject[],
  opts?: DOMRouterOpts,
) => {
  const parsed: RouteObject[] = routes.map(
    ({ element, active, ...others }) => {
      return {
        ...others,
        element: <Page active={active}>{element}</Page>,
      }
    },
  )

  return createBrowserRouter(parsed)
}
