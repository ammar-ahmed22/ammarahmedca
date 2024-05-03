import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Page from '../components/Page'

export type DOMRouterOpts = Parameters<typeof createBrowserRouter>[1]
export type PageRouteObject = RouteObject & {
  element: React.ReactNode
  active?: string
  title?: string
}

export const createPageBrowserRouter = (
  routes: PageRouteObject[],
  opts?: DOMRouterOpts,
) => {
  const parsed: RouteObject[] = routes.map(
    ({ element, active, title, ...others }) => {
      return {
        ...others,
        element: (
          <Page active={active} title={title}>
            {element}
          </Page>
        ),
      }
    },
  )

  return createBrowserRouter(parsed)
}
