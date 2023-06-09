import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import useAuth from "../../hooks/useAuth";

// Componente de login
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", formData);
    promise.then((response) => {
      login(response.data);
      if (response.data.membership === null) {
        navigate("/subscriptions");
      } else {
        navigate("/home");
      }
    });
    promise.catch(() => {
      alert('Erro, tente novamente');
    });
  }
  

  return (
    <Container>

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <Button type="submit" >
          Entrar
        </Button>
      </Form>

      <Link to="/sign-up">
        Não tem uma conta? Cadastre-se!
      </Link>
    </Container>
  );
};

export default LoginPage;

const Form = styled.form`
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const LogoContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
`;

const Title = styled.h1`
font-family: 'Playball';
font-style: normal;
font-weight: 400;
font-size: 68.982px;
line-height: 86px;

text-align: center;

color: #126BA5;
`;

const Input = styled.input`
    width: 300px;
    height: 45px;
    text-color: black;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-bottom: 8px;
    padding-left: 8px;
`;

const Button = styled.button`
  width: 300px;
  height: 45px;
  background: #FF4791;
  border-radius: 4.63636px;
`;

const SignupText = styled.p`
font-style: normal;
font-weight: 400;
font-size: 13.976px;
line-height: 17px;
text-align: center;
text-decoration-line: underline;

color: #52B6FF;
`;
