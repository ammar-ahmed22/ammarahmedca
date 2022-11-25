import { 
  Button,
  Flex, 
  FormControl, 
  FormErrorMessage, 
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text, 
  VStack
} from "@chakra-ui/react";
import { Formik, Field, FormikProps } from "formik";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
import React, { useState } from "react";
import Card from "../../components/Card";

const Login : React.FC = () => {

  const [show, setShow] = useState(false);

  return (
    <Flex justify="center" align="center" h="80vh" w="100%">
      <Card w="60%" h="auto" >
        <Text 
          fontSize={{ base: "4xl", lg: "5xl" }} 
          fontFamily="heading" 
          textAlign="center"
          fontWeight="bold"
        >
          <Text as="span" variant="gradient">Welcome back!</Text>
        </Text>
        <Text textAlign="center" mb="2" >Login to play your next move.</Text>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2))
          }}
        >
          {({ handleSubmit, errors, touched } : FormikProps<{email: string, password: string}>) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Field 
                      as={Input}
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      variant="filled"
                    />
                    <InputRightElement>
                      <IconButton 
                        aria-label="Show password" 
                        icon={show ? <FaRegEye /> : <FaRegEyeSlash />} 
                        variant="ghost" 
                        onClick={() => setShow(prev => prev ? false : true)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button width="full" type="submit" bgGradient="linear(to-tr, brand.purple.500, brand.blue.500)">Login</Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Card>
    </Flex>
  )
}

export default Login;