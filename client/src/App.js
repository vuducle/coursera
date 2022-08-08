import logo from './logo.svg';
import './App.css';
import Dishes from "./Components/Dishes";
import Dashboard from "./Components/Dashboard";
import Authentification from './utils/Authentification';
import { Routes, Route, Link, Router } from 'react-router-dom';
import Navigation from './Components/Navigation';
import { ChakraProvider } from '@chakra-ui/react'

const AppRoute = () => {
  return (
    <Routes>
      {/* <Route element={<Authentification/>}> */}
        <Route index path="/"  element={<Dishes />} />
        <Route path="dashboard"  element={<Dashboard />} />
      {/* </Route> */}

       
   
    </Routes>
  );
};

function App() {
    return (
      
        <ChakraProvider>
          <div className='LindaApp'>
        
          <Navigation />

           <AppRoute />
        
            
            
          </div>
        </ChakraProvider>
  );
}

export default App;
