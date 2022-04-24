import React, { useState, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Flex, FormControl, Text, HStack, FormLabel, Input, SimpleGrid, Select, FormHelperText, FormErrorMessage, Button, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom"
import { useMutation, gql } from '@apollo/client';

const Register = () => {
    const styleProps = {
        main: {
            justify: "center",
            //align: 'center',
            direction: "column",
            mt: "10vh"
        },
        title: {
            fontSize: "4xl",
            fontFamily: "heading",
            textAlign: "center"
        }
    }

    const REGISTER = gql`
        mutation register(
            $firstName: String!
            $lastName: String!
            $email: String!
            $password: String!,
            $company: String,
            $position: String,
            $foundFrom: String
        ){
            register(
                firstName: $firstName,
                lastName: $lastName,
                email: $email,
                password: $password,
                company: $company,
                position: $position,
                foundFrom: $foundFrom
            ){
                token
                message
            }
        }
    `

    const [ signUp, { data, loading, error }] = useMutation(REGISTER);

    const [ firstName, setFirstName ] = useState(""),
          [ lastName, setLastName ] = useState(""),
          [ email, setEmail ] = useState(""),
          [ password, setPassword ] = useState(""),
          [ confirmPass, setConfirmPass ] = useState(""),
          [ company, setCompany ] = useState(""),
          [ position, setPosition ] = useState(""),
          [ foundFrom, setFoundFrom ] = useState(""),
          [ errors, setErrors ] = useState({
              passMatchErr: false,
              passReqMet: false,
              validEmail: false,
          }),
          [submitError, setSubmitError] = useState("");
    
    const handleConfirmPassChange = e => {
        setConfirmPass(e.target.value);

        if (e.target.value !== password){
            setErrors( prev => ({...prev, passMatchErr: true}));
        }else{
            setErrors(prev => ({...prev, passMatchErr: false}));
        }
    }

    const handlePassChange = e => {
        setPassword(e.target.value);

        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{6,}$/

        setErrors(prev => ({...prev, passReqMet: passRegex.test(e.target.value)}))

        
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        console.log("validEmail:", emailRegex.test(e.target.value))
        setErrors( prev => ({...prev, validEmail: emailRegex.test(e.target.value)}))
    }

    const handleFoundFromChange = e => {
        console.log(e.target.value);
        setFoundFrom(e.target.value);
    }

    const handleSignup = e => {
        e.preventDefault();
        
        if (!errors.validEmail || !errors.passReqMet || errors.passMatchErr){
            setSubmitError("Please correct errors above.")
        }

        if (email === "" || password === "" || firstName === "" || lastName === ""){
            setSubmitError("Please provide values for all required fields.")
        }

        if (!submitError){
            signUp({
                variables: {
                    firstName,
                    lastName,
                    email,
                    password,
                    company,
                    position,
                    foundFrom
                }
            })
        }

    }

    useEffect(() => {
        if (email === ""){
            setErrors(prev => ({...prev, validEmail: true}))
        }

        if (password === ""){
            setErrors(prev => ({...prev, passReqMet: true}))
        }
    }, [email, password])

    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Flex {...styleProps.main}>
                    <Text {...styleProps.title}>Let's play Chess.</Text>
                    <Text textAlign="center" >Create an account to play a game of Chess with me!</Text>

                    
                    <Text fontFamily="heading" fontSize="xl" mt="2">Account details:</Text>
                    <FormControl mt="2" isRequired isInvalid={!errors.validEmail}>
                            <FormLabel fontSize="sm">Email</FormLabel>
                            <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
                            {
                                errors.validEmail ? <FormHelperText></FormHelperText> : <FormErrorMessage>Please provide a valid e-mail address.</FormErrorMessage>
                            }
                    </FormControl>
                    <FormControl mt="2" isRequired isInvalid={!errors.passReqMet}>
                            <FormLabel fontSize="sm">Password</FormLabel>
                            <Input type="password" placeholder="Password" value={password} onChange={handlePassChange}/>
                            { errors.passReqMet ? <FormHelperText>At least 6 characters, 1 letter and 1 number</FormHelperText> : <FormErrorMessage>Must contain 6 characters, 1 letter and 1 number</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt="2" isRequired isInvalid={errors.passMatchErr}>
                            <FormLabel fontSize="sm">Confirm password</FormLabel>
                            <Input type="password" placeholder="Confirm password" value={confirmPass} onChange={handleConfirmPassChange} />
                            {
                                !errors.passMatchErr ? (<FormHelperText></FormHelperText>) : (<FormErrorMessage>Passwords must match</FormErrorMessage>)
                            }
                    </FormControl>
                    <Text fontFamily="heading" fontSize="xl" mt="2">A little bit about you:</Text>
                    <SimpleGrid columns={2} spacing={2} w="100%" mt="2">
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">First Name</FormLabel>
                            <Input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel fontSize="sm">Last Name</FormLabel>
                            <Input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </FormControl>
                        <FormControl >
                            <FormLabel fontSize="sm">Where do you work?</FormLabel>
                            <Input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)}/>
                        </FormControl>
                        <FormControl >
                            <FormLabel fontSize="sm">What's your position?</FormLabel>
                            <Input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
                        </FormControl>
                    </SimpleGrid>
                    <FormControl mt="2">
                        <FormLabel fontSize="sm">Where did you find this website?</FormLabel>
                        <Select placeholder="Choose an option" color={foundFrom === "" ? "gray.400" : "gray.800"} onChange={handleFoundFromChange}>
                            <option>LinkedIn</option>
                            <option>Resume</option>
                            <option>Search engine</option>
                            <option>Word of mouth</option>
                            <option>Other</option>
                        </Select>
                    </FormControl>
                    {
                        foundFrom === "Other" && (
                            <FormControl mt="2">
                                <FormLabel>Other:</FormLabel>
                                <Input type="text" placeholder="Please provide an answer"/>
                            </FormControl>
                        )
                    }
                    <Button colorScheme="red" bg="primaryLight" color="white" mt="4" onClick={handleSignup} isLoading={loading}>Sign up</Button>
                    <Text fontSize="sm" color="gray.500" mt="2" textAlign="center">Already have an account? <Link color="primaryLight" to="/chess/login" as={ReactLink}>Log in</Link></Text>
                    {
                        data && <Text>{data.register.message}</Text>
                    }
                    {
                        error && <Text>network error</Text>
                    }
                </Flex>
            </PageContent>
            <Footer />
        </>
    );
}

export default Register;
