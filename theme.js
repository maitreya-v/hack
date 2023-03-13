import { extendTheme,theme as base ,withDefaultVariant } from "@chakra-ui/react"
import './styles.css'

const theme =extendTheme({
    fonts:{
        heading:'Poppins',
        body:'Poppins'
    },
},
withDefaultVariant({
  variant:'filled',
  components:['Input']      
})
);



export default theme;