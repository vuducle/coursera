import logo from './logo.svg';
import './App.css';
import Dishes from "./Components/Dishes";
import { ChakraProvider } from '@chakra-ui/react'
function App() {
    return (
      <ChakraProvider>
        <div>
          <Dishes></Dishes>
        </div>
      </ChakraProvider>
  );
}

export default App;
