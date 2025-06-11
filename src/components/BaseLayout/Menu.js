import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { user, logoutUser } = useContext(UserContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate(`/login`);
  };

  const handleHistoryClick = () => {
    navigate(`/consultas`);
  };

  return (
    <Navbar className="bg-body-secondary" expand="lg">
      <Container>
        <Navbar.Brand href="/">ChatBot</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >Desafíos</Nav.Link>
            <Nav.Link onClick={handleHistoryClick}>Historial de Preguntas</Nav.Link>
          </Nav>
          <Navbar.Text className="me-3">Bienvenido: {user.username}</Navbar.Text>
          <Button variant="primary" onClick={handleLogout}>Cerrar Sesión</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
