import logo from './logo.svg';
import './App.css';
import Dishes from "./Components/Dishes";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Authentification from './utils/Authentification';
import { Routes, Route, Link, Router } from 'react-router-dom';
import Navigation from './Components/Navigation';
import { ChakraProvider } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import { resetLoginState } from './redux/actions';


const AppRoute = () => {
  const linda = useSelector((state) => state.appState.auth);
  console.log(linda)
  
  return (
    <Routes>
      {/* <Route element={<Authentification/>}> */}
        <Route index path="/"  element={<Dishes />} />
        {
          linda && <Route path="dashboard"  element={<Dashboard />} />
        }
      {/* </Route> */}
        <Route path="register" element={<Register />}/>
       
   
    </Routes>
  );
};

function App() {
  const [cookies] = useCookies(['gigachad']);
  const dispatch = useDispatch();
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
