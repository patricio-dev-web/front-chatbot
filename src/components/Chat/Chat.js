import React, { useState, useRef, useEffect, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';
import './Chat.css';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ text: "¡Hola! ¿En qué puedo ayudarte?", user: 'ChatBot' }]);
    }
  }, []);

  const sendMessage = async () => {
    const trimmedInput = input.trim().replace(/\s+/g, ' ');

    if (!trimmedInput) return;

    const newMessages = [...messages, { text: trimmedInput, user: 'YOU' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Crear el payload para la API de OpenAI con todo el historial de mensajes
    const apiMessages = newMessages.map(msg => ({
      role: msg.user === 'YOU' ? 'user' : 'assistant',
      content: msg.text
    }));

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: apiMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY_FRONT}`
          }
        }
      );

      const botResponse = response.data.choices[0].message.content.trim();
      const botMessages = [...newMessages, { text: botResponse, user: 'ChatBot' }];

      if (trimmedInput && botResponse) {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL || "https://chatbot-desafio.site/api"}/consultas`,
          {
            userId: user.id,
            userQuery: trimmedInput,
            botResponse
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
      }

      setMessages(botMessages);
    } catch (error) {
      const botMessages = [...newMessages, { text: 'ERROR: Respuesta de GPT no encontrada', user: 'ChatBot' }];
      if (trimmedInput) {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL || "https://chatbot-desafio.site/api"}/consultas`,
            {
              userId: user.id,
              userQuery: trimmedInput,
              botResponse: "ERROR: Respuesta de GPT no encontrada"
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
      setMessages(botMessages);
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='container'>
      <div ref={chatContainerRef} className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            <div className="message-sender">{message.user}</div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        {loading && (
          <div className="loader">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
      <div className="input-container">
        <textarea
          className="message-input"
          placeholder="Escribe tu consulta..."
          value={input}
          onChange={handleInputChange}
        />
        <Button className="send-button" variant="success" onClick={sendMessage} disabled={loading}>Enviar</Button>
      </div>
    </div>
  );
};

export default Chat;
