import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useAuth from "../../hooks/useAuth";
import PerkCard from './PerkCard';
import avatarImage from './../../assets/img/avatar.png';
import { IonIcon } from 'react-ionicons';


const HomePage = () => {
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  function handleChangePlan() {
    login({
      ...auth,
      membership: null
    });
    navigate("/subscriptions");
  }

  function handleCancelPlan() {
    axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then(() => {
      login({
        ...auth,
        membership: null
      });
      navigate("/subscriptions");
    });
  }

  return (
    <Container>
      <Header>
        <Logo src={auth.membership.image} />
        <Avatar src={avatarImage} alt="" />
      </Header>
      <ContentContainer>
        <Greeting>Olá, {auth.name}</Greeting>
        {auth.membership.perks.map((perk) => (
          <PerkCard key={perk.id} perk={perk} />
        ))}
      </ContentContainer>
      <Footer>
        <ChangePlanButton onClick={handleChangePlan}>Mudar Plano</ChangePlanButton>
        <CancelPlanButton onClick={handleCancelPlan}>Cancelar Plano</CancelPlanButton>
      </Footer>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img``;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
`;


const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Greeting = styled.h1``;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  bottom: 0;
`;

const ChangePlanButton = styled.button`
  width: 299px;
  height: 52px;
  background-color: #FF4791;
  border-radius: 8px;
  color: white;
  margin: 5px;
  
`;

const CancelPlanButton = styled.button`
  width: 299px;
  height: 52px;
  background-color: red;
  border-radius: 8px;
  color: white;
  margin: 5px;
`;
