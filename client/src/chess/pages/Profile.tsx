import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import ProfileImage from "../components/ProfileImage";
import { Formik, Field, FormikProps } from "formik";
import { useAuthMutation } from "../../hooks/auth";
import { gql } from "@apollo/client";

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const toast = useToast();

  const [update, { submitted, loading, error }] = useAuthMutation<{
    data: {
      firstName?: string;
      lastName?: string;
      middleName?: string;
      company?: string;
      position?: string;
    };
  }>(
    "updateUser",
    gql`
      mutation Mutation($data: UpdateInput!) {
        updateUser(data: $data) {
          token
        }
      }
    `
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (submitted && !loading && !error) {
      toast({
        title: "User updated!",
        description: "User was updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [submitted, loading, error, toast]);

  type Values = {
    firstName: string;
    lastName: string;
    middleName: string;
    company: string;
    position: string;
  };

  const initialValues: Values = {
    firstName: user.firstName,
    lastName: user.lastName,
    middleName: user.middleName ?? "",
    company: user.company ?? "",
    position: user.position ?? "",
  };

  const hasChanged = (initial: Values, values: Values): boolean => {
    for (const key in initial) {
      const k = key as keyof Values;
      if (initial[k] !== values[k]) return true;
    }

    return false;
  };

  return (
    <Box>
      <Text
        fontSize={{ base: "5xl", lg: "6xl" }}
        as="h1"
        fontFamily="heading"
        variant="gradient"
      >
        Profile
      </Text>
      <ProfileImage
        image={user.profilePic}
        letter={
          user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
        }
        size="10vh"
        fontSize="2.5vh"
      />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2))
          update({
            variables: {
              data: {
                firstName: values.firstName,
                lastName: values.lastName,
                middleName: values.middleName,
                company: values.company,
                position: values.position,
              },
            },
          });
        }}
      >
        {({ handleSubmit, errors, touched, values }: FormikProps<Values>) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start" mt="2">
              <HStack w="100%">
                <FormControl>
                  <FormLabel htmlFor="firstName" fontWeight="bold">
                    First Name
                  </FormLabel>
                  <Field
                    as={Input}
                    type="fName"
                    name="firstName"
                    id="firstName"
                    variant={"outline"}
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="middleName" fontWeight="bold">
                    Middle Name
                  </FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    name="middleName"
                    id="middleName"
                    variant={"outline"}
                  />
                  <FormErrorMessage>{errors.middleName}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="lastName" fontWeight="bold">
                    Last Name
                  </FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    name="lastName"
                    id="lastName"
                    variant={"outline"}
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel htmlFor="company" fontWeight="bold">
                  Company
                </FormLabel>
                <Field
                  as={Input}
                  type="text"
                  name="company"
                  id="company"
                  variant={"outline"}
                />
                <FormErrorMessage>{errors.company}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="position" fontWeight="bold">
                  Position
                </FormLabel>
                <Field
                  as={Input}
                  type="text"
                  name="position"
                  id="position"
                  variant={"outline"}
                />
                <FormErrorMessage>{errors.position}</FormErrorMessage>
              </FormControl>

              <Button
                variant="gradient"
                isDisabled={!hasChanged(initialValues, values)}
                type="submit"
                isLoading={loading}
              >
                Save
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
