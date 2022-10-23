import React from 'react';
import { Button, Text } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const DisplayLimiter = ({ numDisplaying, setNumDisplaying, initial, total, incrementBy, scrollToId=false}) => {

    const handleShowMore = e => {
        if (numDisplaying + incrementBy < total){
            setNumDisplaying( prev => prev + incrementBy)
        }else{
            setNumDisplaying(total)
        }
    }

    const handleShowLess = e => {
        setNumDisplaying(initial)
        if (scrollToId){
            document.getElementById(scrollToId).scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    const styleProps = {
        main: {
            variant: "ghost",
            display: "flex",
            flexDirection: "column",
            _hover: {
                color: "brand.purple.500"
            },
            _focus: {}
        }
    }

    if (numDisplaying < total){
        return (
            <Button {...styleProps.main} onClick={handleShowMore}><Text>Show more</Text><ChevronDownIcon /></Button>
        );
    }else if (numDisplaying === total){
        return (
            <Button {...styleProps.main} onClick={handleShowLess}><Text>Show less</Text><ChevronUpIcon /></Button>
        )
    }
    
}

export default DisplayLimiter;
