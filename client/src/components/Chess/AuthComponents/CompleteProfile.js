import React, { useState, useContext, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { FormControl, FormLabel, Input, SimpleGrid, Select, Flex, Text, Button, useColorModeValue, Alert, AlertIcon, CloseButton } from "@chakra-ui/react"
import { useMutation, gql } from '@apollo/client';
import { Redirect } from "react-router-dom"
import { useAuthToken } from '../../../hooks/authToken';

const CompleteProfile = () => {

    const primary = useColorModeValue("primaryLight", "primaryDark");
    const styleProps = {
        main: {
            direction: "column",
            justify: "center",
            align: "center",
            minH: "60vh"
        },
        title: {
            fontSize: "4xl",
            fontFamily: "heading",
            textAlign: "center"
        },
        formLabel: {
            fontSize: "sm"
        },
        continueBtn: {
            colorScheme: "red",
            bg: primary,
            color: "white",
            mt: 2,
            width: "100%"
        },
        alert: {
            status: "error",
            borderRadius: "md",
            my: 2,
            fontSize: "sm"
        }
    }

    const COMP_PROF = gql`
        mutation completeProfile(
            $company: String,
            $position: String,
            $foundFrom: String,
        ){
            completeProfile(
                company: $company,
                position: $position,
                foundFrom: $foundFrom
            ){
                token
                message
            }
        }
    `

    const [ company, setCompany ] = useState(""),
          [ position, setPosition ] = useState(""),
          [ foundFrom, setFoundFrom ] = useState(""),
          [ foundFromOther, setFoundFromOther ] = useState(""),
          [ submitError, setSubmitError ] = useState("");

    const [ authToken, setAuthToken ] = useAuthToken();
    const [ completeProfile, { data, loading, error }] = useMutation(COMP_PROF);


    const handleSubmit = e => {
        e.preventDefault();

        completeProfile({
            variables: {
                company,
                position,
                foundFrom: foundFrom === "Other" ? foundFromOther === "" ? "Other" : foundFromOther : foundFrom
            },
            errorPolicy: "all",
            onCompleted: (data) => {
                data && setAuthToken(data.completeProfile.token)
            }
        })
    }

    useEffect(() => {
        if (error){
            setSubmitError(error.message);
        }
    }, [error])

    return (
        <>
        <NavBar active="chess"/>
        <PageContent>

        <Flex {...styleProps.main} >

            <Text {...styleProps.title} >A little more about you.</Text>
            <SimpleGrid columns={2} spacing={2} w="100%" mt="2">
                <FormControl >
                    <FormLabel {...styleProps.formLabel} >Where do you work?</FormLabel>
                    <Input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)}/>
                </FormControl>
                <FormControl >
                    <FormLabel {...styleProps.formLabel} >What's your position?</FormLabel>
                    <Input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
                </FormControl>
            </SimpleGrid>
            <FormControl mt="2">
                <FormLabel {...styleProps.formLabel} >Where did you find this website?</FormLabel>
                <Select placeholder="Choose an option" color={foundFrom === "" ? "gray.400" : "gray.800"} onChange={e => setFoundFrom(e.target.value)}>
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
                        <FormLabel {...styleProps.formLabel} >Other:</FormLabel>
                        <Input type="text" placeholder="Please provide an answer" value={foundFromOther} onChange={e => setFoundFromOther(e.target.value)}/>
                    </FormControl>
                )
            }
            
            <Button {...styleProps.continueBtn} onClick={handleSubmit} isLoading={loading} >Continue</Button>
            
            {
                data && authToken && <Redirect to={"/chess/secure"} />
            }
            {
                submitError && (
                    <Alert {...styleProps.alert} >
                        {
                            submitError
                        }
                        <CloseButton position="absolute" top="8px" right="8px" onClick={() => setSubmitError("")}/>
                    </Alert>
                )
            }
            </Flex>
            </PageContent>
            <Footer />
            </>
    );
}

export default CompleteProfile;
