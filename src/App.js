import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Login from "./components/Login/Login";
import BaseLayout from "./components/BaseLayout/BaseLayout.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./components/Chat/Chat.js";
import ConsultasPorFecha from "./components/consultas/ConsultasPorFecha.js";
import "react-toastify/dist/ReactToastify.css";
import {  ToastContainer } from 'react-toastify';
import Register from "./components/Register/Register.js";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <BaseLayout>
              <Chat></Chat>
            </BaseLayout>
          } />
          <Route path="/consultas" element={
            <BaseLayout>
              <ConsultasPorFecha/>
            </BaseLayout>
          } />

        </Routes>
      </UserProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
