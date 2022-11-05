import React from "react"

// Sections
import Hero from "./Hero"
import Projects from "./Projects"
import Experience from "./Experience"
import Skills from "./Skills"


const Home : React.FC = () => {
    return (
        <>
            <Hero />
            <Projects />
            <Skills />
            <Experience />
        </>
    )
}

export default Home