import React from 'react';
import { Container } from "@chakra-ui/react"
import Hero from './Hero';
import About from './About';
import Timeline from './Timeline';

const Main = () => {

    const styleProps = {
        container: {
            minH: "100vh",
            maxW: "container.md",
            marginTop: "10vh",
            p: 4
        }
    }

    return (
        <Container {...styleProps.container} as="main" >
            <Hero />
            {/* <About /> */}
            <Timeline />
        </Container>
    );
}

export default Main;
