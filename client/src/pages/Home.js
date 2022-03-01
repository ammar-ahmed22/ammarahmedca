import React from "react"
import NavBar from "../components/NavBar"
import PageContent from "../components/PageContent"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Timeline from "../components/Timeline"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <>
            <NavBar active="home"/>
            {/* <Main /> */}
            <PageContent>
                <Hero />
                <Projects />
                <Timeline />
            </PageContent>
            <Footer />
            {/* <Avatar /> */}
        </>
    )
}

export default Home