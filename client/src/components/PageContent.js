import React from 'react';
import { Container } from "@chakra-ui/react"

const PageContent = ({children}) => {

    const styleProps = {
        container: {
            minH: "100vh",
            maxW: "container.md",
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
