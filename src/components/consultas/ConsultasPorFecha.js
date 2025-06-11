import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';
import UserContext from "../../contexts/UserContext";

const ConsultasPorFecha = () => {
    const [consultas, setConsultas] = useState([]);
    const { user } = useContext(UserContext);

    const fetchConsultas = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL || "https://chatbot-desafio.site/api"}/consultas/${user.id}`);
            setConsultas(response.data);
        } catch (error) {
            console.error('Error fetching consultas:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchConsultas();
        }
    }, [user]);

    return (
        <div className='container my-5'>
            {consultas.length > 0 ? (
                consultas.map((consulta, index) => (
                    <Accordion key={index}>
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>{consulta.date}</Accordion.Header>
                            <Accordion.Body>
                                <div className="chat-container">
                                    {consulta.messages.map((message, messageIndex) => (
                                        <div key={messageIndex} className={`message ${message.user}`}>
                                            <div className="message-sender">{message.user}</div>
                                            <div className="message-text">{message.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            ) : (
                <h4>No se registran consultas para el usuario</h4>
            )}
        </div>
    );
};

export default ConsultasPorFecha;
