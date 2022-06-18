import React from "react"
import NavBar from "../components/NavBar"
import PageContent from "../components/PageContent"
import Hero from "../components/Hero"
import Projects from "../components/Projects/Projects"
import Experience from "../components/Experience"
import Skills from "../components/Skills"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <>
            <NavBar active="home"/>
            <PageContent>
                <Hero />
                <Projects />
                <Skills />
                <Experience />
            </PageContent>
            <Footer />
        </>
    )
}

export default Home