import React, { useEffect, useState, useContext } from "react";
import { 
  Text, 
  PinInput, 
  HStack, 
  PinInputField, 
  Button, 
  Flex, 
  Link, 
  VStack,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon
} from "@chakra-ui/react"
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import Card from "../../components/Card";
import { useAuthMutation } from "../../hooks/auth";
import { gql } from "@apollo/client";
import { Formik, Field, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

const ConfirmEmail : React.FC = () => {

  const [newCodeSent, setNewCodeSent] = useState(false);

  const { user } = useContext(AuthContext) as AuthContextType;

  const confirmEmailMutation = gql`
    mutation ConfirmEmail($code: Int!) {
      confirmEmail(code: $code) {
        token
      }
    }
  `

  const newCodeMutation = gql`
    mutation NewEmailCode {
      newEmailCode {
        token
      }
    }
  `

  const navigate = useNavigate();

  const [confirm, confirmResponse] = useAuthMutation<{ code: number }>("confirmEmail", confirmEmailMutation)
  const [newCode, newCodeResponse] = useAuthMutation("newEmailCode", newCodeMutation);

  // useEffect(() => {
  //   if (confirmResponse.submitted && !confirmResponse.loading && !confirmResponse.error){

  //   }
  // }, [value])

  useEffect(() => {
    if (confirmResponse.submitted && !confirmResponse.loading && !confirmResponse.error){
      navigate("/chess/play")
    }
  }, [confirmResponse, navigate])

  useEffect(() => {
    if (newCodeResponse.submitted && !newCodeResponse.loading && !newCodeResponse.error){
      setNewCodeSent(true);
    }
  }, [newCodeResponse, setNewCodeSent])
  

  return (
    <Flex justify="center" align="center" h="60vh" w="100%" direction="column">
      {
        newCodeSent && (
          <Alert status="success" variant="left-accent" w="75%">
            <AlertIcon />
            Confirmation code sent to: { user.email }
          </Alert>
        )
      }
      <Card w='75%' h="auto">
        <Text
          fontSize={{ base: "4xl", lg: "5xl" }} 
          fontFamily="heading" 
          textAlign="center"
          fontWeight="bold"
          variant="gradient"
        >
          Confirm Email
        </Text>
        <Text textAlign="center" mb="4" >Enter the 6-digit code sent to your email: <Text as="span" fontWeight="bold">{ user.email }</Text></Text>
        <Formik
          initialValues={{
            code: ""
          }}
          onSubmit={(values) => {
            confirm({ variables: {
              code: parseInt(values.code)
            }})
          }}
        >
          {({ handleSubmit, errors, touched, setFieldValue, setFieldTouched, values} : FormikProps<{ code: string }>) => (
            <form onSubmit={handleSubmit}>
              <VStack align="center" spacing={4} >
                <FormControl isInvalid={!!errors.code && touched.code} w="100%">
                  <HStack justify="center" >
                    <Field
                      component={PinInput}
                      onChange={(value: string) => {
                        setFieldTouched("code", true, true);
                        setFieldValue("code", value, true);
                        if (value === "") setFieldTouched("code", false, true);
                      }}
                      value={values.code}
                      name="code"
                      validate={(value: string) => {
                        if (value.length < 6) return "Code must be 6-digits."
                      }}

                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </Field>
                  </HStack>
                  <FormErrorMessage justifyContent="center">{errors.code}</FormErrorMessage>
                </FormControl>
                <Button type="submit" width="full" variant="gradient">Confirm</Button>
                <Text fontSize="sm" textAlign="center" w="100%" >Didn't get a code? <Link color="brand.purple.300" onClick={(e) => {
                  e.preventDefault();
                  newCode();
                }} >Resend</Link></Text>
              </VStack>
            </form>
          )}
        </Formik>
        {/* <HStack justify="center" mt="5">
          <PinInput value={value} onChange={val => setValue(val)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <HStack justify="center" my="5" w="100%">
          <Button w="full" variant="gradient" onClick={handleSubmit}>Confirm</Button>
          
        </HStack> */}
        
      </Card>
    </Flex>
  )
};

export default ConfirmEmail;