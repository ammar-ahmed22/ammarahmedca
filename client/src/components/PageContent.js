import React, { useEffect } from 'react';
import { Container, useMediaQuery } from "@chakra-ui/react"

const PageContent = ({children}) => {

    const [isLargerThan767, isLargerThan1024] = useMediaQuery([
        "(min-width: 767px)",
        "(min-width: 1024px)"
    ])

    useEffect(() => {
        if (isLargerThan767){
            console.log("LARGER THAN 767px")
        }

        if (isLargerThan1024){
            console.log("LARGER THAN 1024px")
        }
    }, [isLargerThan767, isLargerThan1024])

    const styleProps = {
        container: {
            minH: "100vh",
            maxW: { base: "100%", md: "container.sm", lg: "container.md" },
            marginTop: "10vh",
            p: 4
        }
    }

    return (
        <Container {...styleProps.container} >
            {
                children
            }
        </Container>
    );
}

export default PageContent;
