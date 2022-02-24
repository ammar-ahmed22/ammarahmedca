import React from "react"
import NavBar from "../components/NavBar"
import PageContent from "../components/PageContent"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Timeline from "../components/Timeline"

const Home = () => {
    return (
        <>
            <NavBar />
            {/* <Main /> */}
            <PageContent>
                <Hero />
                <Projects />
                <Timeline />
            </PageContent>
            {/* <Avatar /> */}
        </>
    )
}

export default Home