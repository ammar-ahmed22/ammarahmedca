import React, { useState, useEffect } from 'react';
import NavBar from '../../Page/NavBar';
import PageContent from '../../Page/PageContent';
import Footer from '../../Page/Footer';
import { Flex, Text, FormControl, FormLabel, Input, useColorModeValue, Button, Box, Alert, AlertIcon, CloseButton } from "@chakra-ui/react"
import { useMutation, gql } from '@apollo/client';

const ForgotPassword = () => {
    const primary = useColorModeValue("primaryLight", "primaryDark");
    const styleProps = {
        main: {
            direction: "column",
            align: "center",
            justify: "center",
            minH: "60vh"
        },
        title: {
            fontSize: '4xl',
            fontFamily: "heading",
            textAlign: "center"
        },
        sendBtn: {
            bg: primary,
            color: "white",
            width: "100%",
            colorScheme: "red",
            mt: 4
        }
    }

    const FORGOT_PASS = gql`
        mutation forgotPassword($email: String!){
            forgotPassword(email: $email)
        }
    `

    const [forgotPassword, { data, loading, error }] = useMutation(FORGOT_PASS, {
        errorPolicy: "all"
    })

    const handleSubmit = e => {
        e.preventDefault();
        if (email !== ""){
            forgotPassword({
                variables: {
                    email
                }
            })
        }
    }

    useEffect(() => {
        if (error){
            setSubmitError(error.message);
        }
    }, [error])

    const [email, setEmail] = useState("");
    const [submitError, setSubmitError] = useState("");

    return (
        <>
            <NavBar active="chess" />
            <PageContent >
                <Flex {...styleProps.main}>
                    <Text {...styleProps.title}>Forgot your password?</Text>
                    <Text>No worries, I'll send you reset instructions.</Text>
                    <Box width="50%" mt={4}>
                    <FormControl isRequired >
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)}/>
                    </FormControl>
                    <Button {...styleProps.sendBtn} onClick={handleSubmit} isLoading={loading}>Send</Button>
                    {
                        data && (
                            <Alert status="success" borderRadius="md" mt="2" >
                                <AlertIcon />
                                Password reset email sent!
                            </Alert>
                        )
                    }
                    {
                        submitError && (
                            <Alert status="error" borderRadius="md" mt="2">
                                <AlertIcon />
                                {
                                    submitError
                                }
                            </Alert>
                        )
                    }
                    </Box>
                </Flex>
            </PageContent>
            <Footer/>
        </>
    );
}

export default ForgotPassword;
