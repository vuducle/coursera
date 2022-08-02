import logo from './logo.svg';
import './App.css';
import Dishes from "./Components/Dishes";
import Navigation from './Components/Navigation';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
    return (
      <ChakraProvider>
        <div>
         <Navigation></Navigation>
         
          <Dishes></Dishes>
        </div>
      </ChakraProvider>
  );
}

export default App;
