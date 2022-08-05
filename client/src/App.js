import logo from './logo.svg';
import './App.css';
import Dishes from "./Components/Dishes";
import Dashboard from "./Components/Dashboard";
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from './Components/Navigation';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
    return (
      <ChakraProvider>
        <div>
         <Navigation></Navigation>
          
            <Routes>
              <Route index element={<Dishes />} />
              <Route path="home" element={<Dishes />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
          
        </div>
      </ChakraProvider>
  );
}

export default App;
