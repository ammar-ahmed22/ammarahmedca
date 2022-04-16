import React, { useEffect } from 'react';
import { Container, useMediaQuery } from "@chakra-ui/react"

const PageContent = ({children}) => {

    

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
