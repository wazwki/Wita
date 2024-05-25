import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Login from './components/User/Loginpage'; 
import Register from './components/User/Registerpage'; 
import './index.css';

const MainApp = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<App />}/>
        </Routes>
    </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MainApp />
);