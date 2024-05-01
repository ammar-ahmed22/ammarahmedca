import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export type PageProps = {
  children: React.ReactNode,
  active?: string
}

const Page: React.FC<PageProps> = ({ children, active }) => {
  return (
    <>
      <Navigation active={active} />
      <main className='mx-auto max-w-5xl md:px-5 px-3'>{children}</main>
      <Footer />
    </>
  )
}

export default Page
