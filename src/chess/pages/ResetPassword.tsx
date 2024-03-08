import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Button,
  Alert,
  AlertIcon,
  Link,
  Box,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import Card from "../../components/Card";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";

const ResetPassword: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [alerts, setAlerts] = useState<{ success?: string; error?: string }>(
    {}
  );

  const [reset, { data, loading, error }] = useMutation<
    { resetPassword: string },
    { token: string; newPassword: string }
  >(gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
      resetPassword(token: $token, newPassword: $newPassword)
    }
  `);

  useEffect(() => {
    if (!params || !params.token) {
      navigate("/chess/login"); // navigate to an error page
    }
  }, [params, navigate]);

  useEffect(() => {
    if (data && !loading && !error) {
      setAlerts({ success: data.resetPassword });
    }

    if (error) setAlerts({ error: error.message });
  }, [data, loading, error, navigate]);

  return (
    <Flex justify="center" align="center" w="100%" direction="column" h="60vh">
      {alerts.success && (
        <Alert status="success" variant="left-accent" w="75%">
          <AlertIcon />
          <Text>
            {alerts.success}{" "}
            <Link color="green.400" onClick={() => navigate("/chess/login")}>
              {" "}
              Login
            </Link>
          </Text>
        </Alert>
      )}
      {alerts.error && (
        <Alert status="error" variant="left-accent" w="75%">
          <AlertIcon />
          <Text>
            {alerts.error}{" "}
            <Link
              color="red.400"
              onClick={() => navigate("/chess/forgot-password")}
            >
              {" "}
              Try again?
            </Link>
          </Text>
        </Alert>
      )}
      <Card w="75%" h="auto">
        <Box p="5" >
        <Text
          fontSize={{ base: "4xl", lg: "5xl" }}
          fontFamily="heading"
          textAlign="center"
          fontWeight="bold"
          variant="gradient"
        >
          Reset your password
        </Text>
        <Text align="center">Enter a new password below.</Text>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            reset({
              variables: {
                newPassword: values.password,
                token: params.token ?? "",
              },
            });
          }}
        >
          {({ handleSubmit, errors, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      variant="filled"
                      validate={(value: string) => {
                        if (value.length < 6)
                          return "Password must be at least 6 characters.";
                        if (
                          !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d])/.test(
                            value
                          )
                        )
                          return "Password must contain at least 1 uppercase, 1 digit and 1 special character.";
                      }}
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
                </FormControl>

                <FormControl
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={show ? "text" : "password"}
                      variant="filled"
                      validate={(value: string) => {
                        if (value !== values.password)
                          return "Passwords do not match.";
                      }}
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
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                <Button
                  variant="gradient"
                  w="full"
                  type="submit"
                  loadingText="Resetting"
                  isLoading={loading}
                >
                  Reset Password
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      </Card>
    </Flex>
  );
};

export default ResetPassword;
