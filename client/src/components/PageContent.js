import React, { useEffect } from 'react';
import { Container } from "@chakra-ui/react"

const PageContent = ({children}) => {

    

    const styleProps = {
        container: {
            minH: "100vh",
            maxW: { base: "100%", md: "container.sm", lg: "container.md" },
            marginTop: "15vh",
            p: 4
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    return (
        <Container {...styleProps.container} >
            {
                children
            }
        </Container>
    );
}

export default PageContent;
