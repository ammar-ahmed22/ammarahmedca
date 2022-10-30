import React from "react"
import NavBar from "../../components/Page/NavBar"
import PageContent from "../../components/Page/PageContent"
import Hero from "./Hero"
import Projects from "./Projects"
import Experience from "./Experience"
import Skills from "./Skills"
import Footer from "../../components/Page/Footer"

const Home = () => {
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