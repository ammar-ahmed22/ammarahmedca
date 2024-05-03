import React from 'react'

import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Skills from './sections/Skills'

const Landing: React.FC = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
    </>
  )
}

export default Landing
