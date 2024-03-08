import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Alert,
  AlertIcon,
  Box
} from "@chakra-ui/react";
import Card from "../../components/Card";
import { Formik, Field } from "formik";
import { useMutation, gql } from "@apollo/client";

const ForgotPassword: React.FC = () => {
  const [alerts, setAlerts] = useState<{ error?: string; success?: string }>(
    {}
  );

  const [forgotPassword, { data, loading, error }] = useMutation<
    { forgotPassword: string },
    { email: string }
  >(gql`
    mutation ForgotPassword($email: String!) {
      forgotPassword(email: $email)
    }
  `);

  useEffect(() => {
    if (!loading && data) {
      setAlerts({ success: data.forgotPassword });
    }

    if (error) {
      setAlerts({ error: error.message });
    }
  }, [data, loading, error]);

  return (
    <Flex h="60vh" w="100%" justify="center" align="center" direction="column">
      {alerts.error && (
        <Alert status="error" w="75%" variant="left-accent">
          <AlertIcon />
          {alerts.error}
        </Alert>
      )}
      {alerts.success && (
        <Alert status="success" w="75%" variant="left-accent">
          <AlertIcon />
          {alerts.success}
        </Alert>
      )}
      <Card w="75%" h="auto">
        <Box p="5">
        <Text
          fontSize={{ base: "4xl", lg: "5xl" }}
          fontFamily="heading"
          textAlign="center"
          fontWeight="bold"
          variant="gradient"
        >
          Forgot your password?
        </Text>
        <Text textAlign="center" mb="4">
          No worries, enter your email address to reset it.
        </Text>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            // alert(JSON.stringify(values, null, 2))
            forgotPassword({
              variables: {
                email: values.email,
              },
            });
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
                <Button
                  variant="gradient"
                  type="submit"
                  width="full"
                  loadingText="Sending"
                  isLoading={loading}
                >
                  Send Reset Link
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

export default ForgotPassword;
