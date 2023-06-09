import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlanCard from './PlanCard';
import useAuth from "../../hooks/useAuth";

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then((response) => {
      setPlans(response.data);
    });
  }, [auth]);

  function handleSelectPlan(id) {
    navigate(`/subscriptions/${id}`);
  }

  return (
    <Container>
      <Title>Escolha seu plano</Title>
      <CardsContainer>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={() => handleSelectPlan(plan.id)} />
        ))}
      </CardsContainer>
    </Container>
  );
};

export default PlansPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
font-size:32px`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
