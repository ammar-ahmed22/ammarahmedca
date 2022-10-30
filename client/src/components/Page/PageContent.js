import React, { useEffect, useRef } from 'react';
import { Container, Box } from "@chakra-ui/react"

const PageContent = ({children}) => {

    

    const styleProps = {
        container: {
            minH: "100vh",
            maxW: { base: "100%", md: "container.sm", lg: "container.md" },
            marginTop: "15vh",
            p: 4
        }
    }

    const customCursor = useRef();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        if (customCursor.current){
            window.addEventListener("mousemove", (e) => {
                const { clientY, clientX } = e;
                customCursor.current.style.top = "0"
                customCursor.current.style.left = "0"
            })
        }
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
