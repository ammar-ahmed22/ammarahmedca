import React, { useState, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { useQuery } from '../../../hooks/query';
import { Link as ReactLink } from "react-router-dom"; 
import { Flex, Text, FormControl, FormLabel, Input, Button, Box, FormHelperText, FormErrorMessage, useColorModeValue, Link } from "@chakra-ui/react";
import { useMutation, gql } from '@apollo/client';

const ResetPassword = () => {

    const query = useQuery();
    const resetToken = query.get("token");

    const RESET = gql`
        mutation resetPassword(
            $newPassword: String!,
            $resetToken: String!
        ){
            resetPassword(
                newPassword: $newPassword,
                resetToken: $resetToken
            )
        }
    `

    const [resetPassword, { data, loading, error }] = useMutation(RESET, {
        errorPolicy: "all"
    })

    

    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errors, setErrors] = useState({
        passMatchErr: false,
        passReqMet: false,
    })
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        if (error){
            console.log(error.message);
            if (error.message === "Invalid reset token"){
                setInvalid(true);
            }
        }
    }, [error])

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
        resetBtn: {
            bg: primary,
            colorScheme: "red",
            width: "100%",
            color: "white",
            mt: 4
        },
    }

    const handleConfirmPassChange = e => {
        setConfirmPass(e.target.value);

        if (e.target.value !== newPass){
            setErrors( prev => ({...prev, passMatchErr: true}));
        }else{
            setErrors(prev => ({...prev, passMatchErr: false}));
        }
    }

    const handlePassChange = e => {
        setNewPass(e.target.value);

        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{6,}$/

        setErrors(prev => ({...prev, passReqMet: passRegex.test(e.target.value)}))

        
    }

    const handleSubmit = e => {
        if (!errors.passMatchErr && errors.passReqMet && newPass && confirmPass === newPass){
            console.log("RESETTING");
            resetPassword({
                variables: {
                    newPassword: newPass,
                    resetToken
                }
            })
        }
    }

    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Flex {...styleProps.main}>
                    {
                        !invalid && !data && !data.resetPassword && (
                            <>
                            <Text {...styleProps.title}>Reset your password</Text>
                            <Text>Enter your new password below.</Text>
                            <Box width="100%" mt="2">
                                <FormControl mt="2" isRequired isInvalid={!errors.passReqMet}>
                                        <FormLabel {...styleProps.formLabel} >New Password</FormLabel>
                                        <Input type="password" placeholder="Enter new password" value={newPass} onChange={handlePassChange}/>
                                        { errors.passReqMet ? <FormHelperText>At least 6 characters, 1 letter, 1 number and 1 special character.</FormHelperText> : <FormErrorMessage>Must contain 6 characters, 1 letter and 1 number</FormErrorMessage>}
                                </FormControl>
                                <FormControl mt="2" isRequired isInvalid={errors.passMatchErr}>
                                        <FormLabel {...styleProps.formLabel} >Confirm password</FormLabel>
                                        <Input type="password" placeholder="Confirm password" value={confirmPass} onChange={handleConfirmPassChange} />
                                        {
                                            !errors.passMatchErr ? (<FormHelperText></FormHelperText>) : (<FormErrorMessage>Passwords must match</FormErrorMessage>)
                                        }
                                </FormControl>
                            </Box>
                            <Button {...styleProps.resetBtn} onClick={handleSubmit} isLoading={loading} >Reset</Button>
                            {
                                data && <Text>{data.resetPassword}</Text>
                            }
                            </>
                        )
                    }
                    {
                        invalid && (
                            <>
                                <Text {...styleProps.title}>Link Expired</Text>
                                <Link color={primary} to="/chess/forgotpassword" as={ReactLink} >Try again?</Link>
                            </>
                        )
                    }
                    {
                        data && data.resetPassword && (
                            <>
                                <Text {...styleProps.title}>Password reset successfully!</Text>
                                <Link color={primary} to="/chess/login" as={ReactLink} >Log in?</Link>
                            </>
                        )
                    }
                </Flex>
            </PageContent>
            <Footer />
        </>

    );
}

export default ResetPassword;
