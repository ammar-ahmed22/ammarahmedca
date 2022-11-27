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
  HStack,
  Select,
  Icon,
  Link,
  InputLeftElement
} from "@chakra-ui/react";
import { Formik, Field, FormikProps } from "formik";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
import { BsArrowLeft } from "react-icons/bs"
import { FiFile } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { useAuthMutation } from "../../hooks/auth";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Register : React.FC = () => {

  const [show, setShow] = useState(false);
  const [next, setNext] = useState(false);
  const [data, setData] = useState<Omit<RegisterData, "company" | "position" | "foundBy" | "profilePic">>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
  });
  const navigate = useNavigate();

  const registerMutation = gql`
    mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
    }
  }
  `

  const [register, { submitted, error, loading }] = useAuthMutation<RegisterInput>("register", registerMutation);

  useEffect(() => {
    if (submitted && !loading && !error) navigate("/chess/confirm-email")
    if (error) console.log(error);
  }, [loading, error, submitted, navigate])

 

  return (
    <Flex justify="center" align="center" w="100%">
      <Card w="80%" h="auto" >
        {
          !next && (
            <>
              <Text 
                fontSize={{ base: "4xl", lg: "5xl" }} 
                fontFamily="heading" 
                textAlign="center"
                fontWeight="bold"
                variant="gradient"
              >
                Register.
              </Text>
              <Text textAlign="center" mb="2" >Create an account to play!</Text>
              <Formik
                initialValues={{
                  email: data.email,
                  password: data.password,
                  confirmPassword: data.password,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  middleName: data.middleName,
                }}
                onSubmit={(values) => {
                  // alert(JSON.stringify(values, null, 2))
                  
                  setData( prev => ({
                    ...prev,
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    middleName: values.middleName,
                    lastName: values.lastName
                  }));
                  setNext(true);
                }}
              >
                {({ handleSubmit, errors, touched, values } : FormikProps<Omit<RegisterData, "company" | "position" | "foundBy" | "profilePic"> & { confirmPassword: string }>) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <HStack spacing={4} >
                        <FormControl isRequired>
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <Field
                            as={Input}
                            id="firstName"
                            name="firstName"
                            type="fName"
                            variant="filled"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                          <Field
                            as={Input}
                            id="middleName"
                            name="middleName"
                            type="mName"
                            variant="filled"
                          />
                        </FormControl>
                        <FormControl isRequired >
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                          <Field
                            as={Input}
                            id="lastName"
                            name="lastName"
                            type="lName"
                            variant="filled"
                          />
                        </FormControl>
                      </HStack>
                      <FormControl isRequired isInvalid={!!errors.email && touched.email}>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          variant="filled"
                          validate={(value: string) => {
                            let error;

                            if (!/\S+@\S+\.\S+/.test(value)){
                              error = "Please provide a valid email address."
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.password && touched.password} isRequired >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                          <Field 
                            as={Input}
                            id="password"
                            name="password"
                            type={show ? "text" : "password"}
                            variant="filled"
                            validate={(value: string) => {
                              if (value.length < 6){
                                return "Password must be at least 6 characters."
                              }
                              if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/.test(value)){
                                return "Password must contain 1 uppercase, 1 digit and 1 special character."
                              }
                            }}
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

                      <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword} isRequired >
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <InputGroup>
                          <Field 
                            as={Input}
                            id="confirmPassword"
                            name="confirmPassword"
                            type={show ? "text" : "password"}
                            variant="filled"
                            validate={(value: string) => {
                              if (value !== values.password){
                                return "Passwords do not match."
                              }
                            }}
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
                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                      </FormControl>
                      <Button width="full" type="submit" variant="gradient">Next</Button>
                      <Text fontSize="sm" textAlign="center" w="100%" >Already have an account? <Link color="brand.purple.300" onClick={() => navigate("/chess/login")} >Login</Link></Text>
                    </VStack>
                  </form>
                )}
              </Formik>
            </>
          )
        }
        {
          next && (
            <>
              <HStack justify="start" >
                <Button leftIcon={<Icon as={BsArrowLeft}/>} variant="ghost" onClick={() => { setNext(false) }} >Back</Button>
              </HStack>
              <Text
                fontSize={{ base: "4xl", lg: "5xl" }} 
                fontFamily="heading" 
                textAlign="center"
                fontWeight="bold"
                variant="gradient"
              >
                A little more about you.
              </Text>
              <Text align="center" mb="4" >Feel free to leave the fields empty if you don't want to share.</Text>
              <Formik
                initialValues={{
                  company: "",
                  position: "",
                  foundBy: "",
                  profilePic: "",
                  fileName: "",
                }}
                onSubmit={(values) => {
                  // register({ variables: {
                  //   data: {
                  //     ...data, 
                  //     company: values.company,
                  //     position: values.position,
                  //     foundBy: values.foundBy
                  //   }
                  // }})
                  alert(JSON.stringify(
                    {
                      ...data,
                      company: values.company,
                      position: values.position,
                      foundBy: values.foundBy,
                      profilePic: values.profilePic
                    },
                    null,
                    2
                  ))
                }}
              >
                {({ handleSubmit, setFieldError, errors, values, setFieldValue, setErrors } : FormikProps<Omit<RegisterData, "email" | "password" | "firstName" | "lastName" | "middleName"> & { fileName: string }>) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl>
                        <FormLabel htmlFor="company">Where do you work?</FormLabel>
                        <Field 
                          as={Input}
                          id="company"
                          name="company"
                          type="text"
                          variant="filled"
                          placeholder="Company Name"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="position">What's your role?</FormLabel>
                        <Field 
                          as={Input}
                          id="position"
                          name="position"
                          type="text"
                          variant="filled"
                          placeholder="Position"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="foundBy">Where did you find this website?</FormLabel>
                        <Field 
                          as={Select}
                          id="foundBy"
                          name="foundBy"
                          placeholder="Select an option"
                        >
                          <option value="linkedin">LinkedIn</option>
                          <option value="resume">Resume</option>
                          <option value="word of mouth">Word of mouth</option>
                          <option value="search engine">Search Engine</option>
                          <option value="other">Other</option>
                        </Field>
                      </FormControl>

                      <FormControl isInvalid={!!errors.profilePic}>
                        <FormLabel htmlFor="profilePic">Profile Picture (max. 2 mb)</FormLabel>
                          
                          <Field 
                            as={Input} 
                            type="file" 
                            name="profilePic"
                            id="profilePic"
                            value={undefined} 
                            variant="ghost" 
                            padding="0"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                             
                              if (!!e.target.files?.length){
                                const file = e.target.files[0];
                                console.log(file.size);
                                setFieldValue("fileName", file.name)
                              
                                const reader = new FileReader();
                                reader.readAsDataURL(file);

                                reader.onload = () => {
                                  console.log(file.name);
                                  setFieldValue("profilePic", reader.result, true);
                                }

                                reader.onerror = (err) => {
                                  console.log("Error:", err);
                                }

                              }
                            }}
                            validate={(value: string) => {
                              const size = new Blob([value]).size
                              if (size > 2000000) return "File size exceeds 2 mb"
                            }}
                          />
                      <FormErrorMessage>{errors.profilePic}</FormErrorMessage>
                      </FormControl>
                      <Button type="submit" width="full" variant="gradient" isLoading={loading} >Complete Registration!</Button>
                      <Text fontSize="sm" textAlign="center" w="100%" >Already have an account? <Link color="brand.purple.300" onClick={() => navigate("/chess/login")} >Login</Link></Text>
                    </VStack>
                  </form>
                )}
              </Formik>
            </>
            
          )
        }
      </Card>
    </Flex>
  )
}

export default Register;