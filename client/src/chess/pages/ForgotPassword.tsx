import React from "react";
import { Flex, Text, Input, FormControl, FormLabel, VStack, Button } from "@chakra-ui/react";
import Card from "../../components/Card";
import { Formik, Field } from "formik"

const ForgotPassword : React.FC = () => {


  return (
    <Flex h="60vh" w="100%" justify="center" align="center" direction="column" >
      <Card w="75%" h="auto" >
        <Text 
          fontSize={{ base: "4xl", lg: "5xl" }} 
          fontFamily="heading" 
          textAlign="center"
          fontWeight="bold"
          variant="gradient"
        >
          Forgot your password?
        </Text>
        <Text textAlign="center" mb="4" >No worries, enter your email address to reset it.</Text>
        <Formik
          initialValues={{
            email: ""
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2))
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} justify="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field 
                    as={Input}
                    name="email"
                    id="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>
                <Button variant="gradient" type="submit" width="full" loadingText="Sending" >Send Reset Link</Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Card>
    </Flex>
  )

}

export default ForgotPassword;