import React from 'react'

import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Experience from './sections/Experience'

const Landing: React.FC = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
    </>
  )
}

export default Landing
