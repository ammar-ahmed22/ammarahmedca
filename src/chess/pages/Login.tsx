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
  VStack,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Formik, Field, FormikProps } from "formik";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/Card";
import { gql } from "@apollo/client";
import { useAuthMutation } from "../../hooks/auth";

const Login: React.FC = () => {
  const [show, setShow] = useState(false);
  // const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const loc = useLocation();

  const loginMutation = gql`
    mutation Login($password: String!, $email: String!) {
      login(password: $password, email: $email) {
        token
      }
    }
  `;

  const [login, { submitted, loading, error }] = useAuthMutation<{
    email: string;
    password: string;
  }>("login", loginMutation);

  useEffect(() => {
    if (!loading && !error && submitted) {
      if (loc.state.redirect){
        navigate(loc.state.redirect);
      } else {
        navigate("/chess/home");
      }
    }
  }, [loading, error, submitted, navigate, loc]);

  return (
    <Flex justify="center" align="center" h="80vh" w="100%" direction="column">
      {error && (
        <Alert status="error" variant="left-accent" w="60%">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Card w="60%" h="auto">
        <Text
          fontSize={{ base: "4xl", lg: "5xl" }}
          fontFamily="heading"
          textAlign="center"
          fontWeight="bold"
        >
          <Text as="span" variant="gradient">
            Welcome back!
          </Text>
        </Text>
        <Text textAlign="center" mb="2">
          Login to play your next move.
        </Text>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            login({
              variables: {
                email: values.username,
                password: values.password,
              },
            });
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
          }: FormikProps<{ username: string; password: string }>) => (
            <form onSubmit={handleSubmit} autoComplete="on">
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="username">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
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
                        onClick={() => setShow((prev) => (prev ? false : true))}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                  <Link
                    color="brand.purple.300"
                    fontSize="sm"
                    onClick={() => navigate("/chess/forgot-password")}
                  >
                    Forgot password?
                  </Link>
                </FormControl>
                <Button
                  width="full"
                  type="submit"
                  variant="gradient"
                  isLoading={loading}
                  loadingText="Logging in"
                >
                  Login
                </Button>
                <Text fontSize="sm" textAlign="center" w="100%">
                  Don't have an account?{" "}
                  <Link
                    color="brand.purple.300"
                    onClick={() => navigate("/chess/register")}
                  >
                    Register
                  </Link>
                </Text>
              </VStack>
            </form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};

export default Login;
