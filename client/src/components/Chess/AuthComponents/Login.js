import React, { useState, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Flex, Text, FormControl, FormLabel, Input, InputRightElement, InputGroup, Button, Link, Box, Alert, AlertTitle, AlertDescription, AlertIcon, CloseButton } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink, Redirect } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';
import { useAuthToken } from '../../../hooks/authToken';

const Login = () => {

    const LOGIN_MUT = gql`
        mutation Login($email: String!, $password: String!){
            login(email: $email, password: $password){
                token
                message
            }
        }
    `

    const styleProps = {
        main: {
            align: "center",
            justify: "center",
            direction: "column",
            mt: "10vh",
            //width: "50%"
        },
        hello: {
            fontSize: "4xl",
            fontWeight: "bold",
            fontFamily: "heading"
        }
    }

    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [authToken, setAuthToken] = useAuthToken();

    const [ attemptLogin, { data, loading, error }] = useMutation(
        LOGIN_MUT,
        {
            onCompleted: (data) => {
                setAuthToken(data.login.token);
            }
        }
        );

    const handleLogin = async e => {
        e.preventDefault();
        console.log(email, password)
        attemptLogin({
            variables: {
                email: email,
                password: password,
            },
            errorPolicy: "all"
        })

    }

    useEffect(() => {
        if (error){
            setErrorMessage(error.message);
        }
    }, [error])
    
    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Flex {...styleProps.main}>
                    <Text {...styleProps.hello}>Hello!</Text>
                    <Text>Login to continue our game.</Text>
                    <Box width="50%" mt="2">
                        <FormControl isRequired >
                            <InputGroup mb="2">
                                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                                <InputRightElement children={<Text color="gray.300">@</Text>}/>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired >
                            <InputGroup >
                                <Input type={showPass ? "text" : "password"} value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                                <InputRightElement>
                                    <Button variant="ghost" color="gray.300" onClick={e => setShowPass(!showPass)}>
                                        {
                                            showPass ? <ViewOffIcon /> : <ViewIcon />
                                        }
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Box display="flex" justifyContent="end" my="2">
                                <Link color="primaryLight" to="/chess/forgotpassword" fontSize="sm" textAlign="end" width="100%" as={ReactLink} >Forgot password?</Link>
                            </Box>
                            
                            <Button width="100%" my="3" bg="primaryLight" color="white" colorScheme="red" onClick={handleLogin} isLoading={loading && !error} >Login</Button>
                            {
                                errorMessage && (
                                <Alert status='error' fontSize="sm" borderRadius="md" mb="2" >
                                    <AlertIcon />
                                    {errorMessage}
                                    <CloseButton position="absolute" top="8px" right="8px" onClick={() => setErrorMessage("")}/>
                                </Alert>
                              )
                            }
                            {
                                data && authToken && (
                                    <Redirect to={{pathname: "/chess/secure", state: { token: data.login.token }}} />
                                )
                            }
                            <Text fontSize="sm" color="gray.500" textAlign="center" >Don't have an account yet? <Link as={ReactLink} to="/chess/register" color="primaryLight">Sign up</Link> </Text>
                            
                            
                        </FormControl>
                    </Box>
                </Flex>
            </PageContent>
            <Footer />
        </>
    );
}

export default Login;
