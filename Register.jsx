//in the new branch

import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./Register.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, redirect, Routes } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Heading,
  Box,
  SimpleGrid,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  HStack,
  Spacer,
  Button,
  VStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import { useToast } from '@chakra-ui/react'
import Navbar from './Header'



const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showRepasswordError, setShowRepasswordError] = useState(false);
  const error = "d-flex";
  const noErrorUsername = `d-flex margin ${showUsernameError ? "hidden" : ""}`;
  const noErrorEmail = `d-flex margin ${showEmailError ? "hidden" : ""}`;
  const noErrorPassword = `d-flex margin ${showPasswordError ? "hidden" : ""}`;
  
  const [showToast,setShowToast] = useState(false);

  const toast = useToast();

  const onRegisterHandler = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setShowPasswordError(true);
    } else {  
      setShowPasswordError(false);
      setShowRepasswordError(false);
      setShowEmailError(false);
      const postObj = {
        name: username,
        email: email,
        password: password,
        re_password: repassword,
      };

      console.log(postObj);
      axios
        .post("http://127.0.0.1:8000/auth/users/", postObj)
        .then((res) => {
          setUsername("");
          setEmail("");
          setPassword("");
          setRepassword("");
          // setShowToast(true);
          toast({
            title: 'Account Created.',
            description: "Please check your mail.",
            status: 'success',
            duration: 9000,
            position:'bottom-right',
            isClosable: true,
          })
          console.log(res);
        })
        .catch((error) => {
          
          if(error.response.request.response==='{\"email\":[\"account with this email already exists.\"]}'){
            setShowEmailError(true);
            toast({
              title: 'Account with this email address already exists',
              description: "Please enter a different email address.",
              status: 'error',
              duration: 9000,
              position:'bottom-right',
              isClosable: true,
            })
          }
          else if(error.response.request.response==='{\"email\":[\"Enter a valid email address.\"]}'){
            setShowEmailError(true);
            toast({
              title: 'Enter a valid email address',
              description: "Please enter a different email address.",
              status: 'error',
              duration: 9000,
              position:'bottom-right',
              isClosable: true,
            })
          }
          else{
            setShowEmailError(false);
          }
          if(error.response.request.response==='{"non_field_errors":["The two password fields didn\'t match."]}'){
            setShowPasswordError(true);
            setShowRepasswordError(true);
            toast({
              title: 'The passwords don\'t match!!',
              description: "Please enter password again.",
              status: 'error',
              duration: 9000,
              position:'bottom-right',
              isClosable: true,
            })
          }
          
          else if(error.response.request.response==="{\"password\":[\"The password is too similar to the email.\"]}"){
            setShowPasswordError(true);
            setShowRepasswordError(true);
            toast({
              title: 'The password is too similar to the email',
              description: "Please enter a different password.",
              status: 'error',
              duration: 9000,
              position:'bottom-right',
              isClosable: true,
            })
          }
          else{
            setShowPasswordError(false);
            setShowRepasswordError(false);
          }
          // else if(error.response.request.response=='')
          console.log(error);
          });

    }
  };

  return (
    <>
      <Navbar/>
      <Flex as="main" justify="center" align="center">
        <VStack>
          <Text fontSize={50} my={4} fontWeight={400}>
            Register for a ride!
          </Text>

          <Box
            height="xl"
            width="md"
            bg=""
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            rounded="md"
            m={3}
          >
            <form>
              <VStack gap={5}>
                <FormControl isRequired>
                  <FormLabel fontWeight="">Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUser />}
                      mt={1}
                    />
                    <Input
                      placeholder="sasha"
                      type="text"
                      color="black"
                      size="lg"
                      width="xs"
                      _focus={{ borderColor: "blackAlpha.900" }}
                      _hover={{borderColor:"blackAlpha.900"}}
                      bg="#eee"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    {
                      showEmailError ?
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BsExclamationTriangleFill/> } 
                        mt="5px"
                        color='red'
                      />
                      :
                      <InputLeftElement
                      pointerEvents="none"
                      children={<MdEmail /> } 
                      mt="5px"
                    />
                    }
                    <Input
                      placeholder="sasha@gmail.com"
                      type="email"
                      color="black"
                      size="lg"
                      width="xs"
                      _focus={{ borderColor: "blackAlpha.900" }}
                      _hover={{borderColor:"blackAlpha.900"}}
                      style={{borderColor: showEmailError ? 'red' : ''}}
                      bg="#eee"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                  {
                      showPasswordError ?
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BsExclamationTriangleFill/> } 
                        mt="5px"
                        color='red'
                      />
                      :
                      <InputLeftElement
                      pointerEvents="none"
                      children={<FaLock /> } 
                      mt="5px"
                    />
                    }
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      color="black"
                      size="lg"
                      width="xs"
                      _focus={{ borderColor: "blackAlpha.900" }}
                      _hover={{borderColor:"blackAlpha.900"}}
                      style={{borderColor: showPasswordError ? 'red' : ''}}
                      bg="#eee"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Input>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                  {
                      showRepasswordError ?
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BsExclamationTriangleFill/> } 
                        mt="5px"
                        color='red'
                      />
                      :
                      <InputLeftElement
                      pointerEvents="none"
                      children={<FaLock /> } 
                      mt="5px"
                    />
                    }
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      color="black"
                      size="lg"
                      width="xs"
                      _focus={{ borderColor: "blackAlpha.900" }}
                      _hover={{borderColor:"blackAlpha.900"}}
                      style={{borderColor: showRepasswordError ? 'red' : ''}}
                      bg="#eee"
                      value={repassword}
                      onChange={(e) => setRepassword(e.target.value)}
                    ></Input>
                  </InputGroup>
                </FormControl>
                <HStack>
                  <Button
                    type="submit"
                    size="lg"
                    width="xs"
                    fontWeight="semilight"
                    bg="blackAlpha.900"
                    color="white"
                    _hover={{ bg: "blackAlpha.800" }}
                    onClick={onRegisterHandler}
                  >
                    Register
                  </Button>
                </HStack>
                <Text>
                  Already a member?{" "}
                  <NavLink exact to="/" className="login-link">
                    Login
                  </NavLink>
                </Text>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default Register;
