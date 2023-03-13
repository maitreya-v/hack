import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Heading,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  VStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useToast } from '@chakra-ui/react'
import Navbar from "./Header";



const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate=useNavigate();
  

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const error=`error ${showErrorMessage ? 'error-visible' : ''}`;
  const toast = useToast();


  const onLoginHandler=(e)=>{
    e.preventDefault();
    const postObj={
        "email":email,
        "password":password
    }
    // axios.post('http://127.0.0.1:8000/api/login/',postObj).then((res)=>{
    //  if(res.status===200) {
    //   localStorage.setItem('loginToken', res.data.token)
    //   navigate("/home")
    //  }
    // })
    // .catch((error) => {
    //   console.log(error)
    //   if (error.response) {
    //     setShowErrorMessage(false);
    //   }
    // });


    axios.post('http://127.0.0.1:8000/auth/jwt/create/',postObj).then((res)=>{
      localStorage.setItem('access',res.data.access);
      localStorage.setItem('refresh',res.data.refresh);
      console.log(res);
      if(res.status===200) navigate('/home');
    })
    .catch((error)=>{
      if(error.response.data.detail==="No active account found with the given credentials"){
        toast({
          title: 'No active account found with the given credentials',
          description: "Please check email and password",
          status: 'error',
          duration: 9000,
          position:'bottom-right',
          isClosable: true,
        })
      }
      
    })
  }



  return (
    <>
    <Navbar/>

      <Flex as="main" justify="center" align="center">
        <VStack>
          <Text fontSize={50} my={4} fontWeight={400}>
            Welcome to Cab-Pool
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
                
                <HStack>
                  <Button
                    type="submit"
                    size="lg"
                    width="xs"
                    fontWeight="semilight"
                    bg="blackAlpha.900"
                    color="white"
                    _hover={{ bg: "blackAlpha.800" }}
                    onClick={(e)=>{
                      onLoginHandler(e);
                    }}
                  >
                    Login
                  </Button>
                </HStack>
                <Text>
                  Not a member?{" "}
                  <NavLink exact to="register/" className="register-link">
                    Register
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

export default Login;
