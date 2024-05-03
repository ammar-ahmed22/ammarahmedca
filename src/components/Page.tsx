import React, { useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga4'

export type PageProps = {
  children: React.ReactNode
  active?: string
  title?: string
}

const Page: React.FC<PageProps> = ({ children, active, title }) => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.initialize('G-JB69PRH5HQ')
    if (process.env.NODE_ENV === 'production') {
      ReactGA.send({ hitType: 'pageview', path: location.pathname })
    }
  }, [location])

  return (
    <>
      <Helmet>
        <title>{title ?? 'Ammar Ahmed'}</title>
      </Helmet>
      <Navigation active={active} />
      <main className='mx-auto max-w-5xl md:px-5 px-3'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Page
