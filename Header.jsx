import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
   <>
    <Flex as="nav" bg="black" align="center" maxHeight="10vh">
        <Heading
          ms="3em"
          my="17px"
          fontSize="2xl"
          fontWeight="semilight"
          color="white"
        >
          Cab-Pool
        </Heading>
      </Flex>
   </>
  )
}

export default Navbar