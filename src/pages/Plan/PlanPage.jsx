import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from "../../hooks/useAuth";

const PlanPage = () => {
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    membershipId: '',
    cardName: '',
    cardNumber: '',
    securityNumber: '',
    expirationDate: ''
  });
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then((response) => {
      setPlan(response.data);
      setFormData((formData) => ({
        ...formData,
        membershipId: response.data.id
      }));
    });
  }, [auth, id]);

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubscribe() {
    setShowModal(true);
  }

  function handleConfirmSubscribe() {
    axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", formData, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then((response) => {
      login({
        ...auth,
        membership: response.data.membership
      });
      navigate("/home");
    }).catch(() => {
      alert("Falha ao assinar");
    });
  }
  

  if (!plan) return null;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
      <PlanContainer>
        <PlanImage src={plan.image} />
        <PerksTitle>Benefícios</PerksTitle>
        <PerksList>
          {plan.perks.map((perk, index) => (
            <Perk key={perk.id}>{index + 1}. {perk.title}</Perk>
          ))}
        </PerksList>
      </PlanContainer>
      <PriceContainer>
        <PriceTitle>Preço</PriceTitle>
        <Price>{plan.price} sendo cobrado mensalmente</Price>
        <Input placeholder="Nome impresso no cartão" name="cardName" onChange={handleInputChange} />
        <Input placeholder="Dígitos do cartão" name="cardNumber" onChange={handleInputChange} />
        <SmallInputsContainer>
          <SmallInput placeholder="Código de segurança" name="securityNumber" onChange={handleInputChange} />
          <SmallInput placeholder="Validade" name="expirationDate" onChange={handleInputChange} />
        </SmallInputsContainer>
        <SubscribeButton onClick={handleSubscribe}>Assinar</SubscribeButton>
      </PriceContainer>
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <ModalText>Tem certeza que deseja assinar o plano {plan.name} por {plan.price}?</ModalText>
            <ModalButtonsContainer>
              <ModalButton onClick={() => setShowModal(false)}>Não</ModalButton>
              <ModalButton onClick={handleConfirmSubscribe}>Sim</ModalButton>
            </ModalButtonsContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
};

export default PlanPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  margin: 20px;
`;

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlanImage = styled.img``;

const PerksTitle = styled.h2``;

const PerksList = styled.ul``;

const Perk = styled.li``;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceTitle = styled.h2``;

const Price = styled.p``;

const Input = styled.input`
  margin-bottom: 10px;
  border-radius: 8px;
  heigth: 100px;
  width: 300px;
`;

const SmallInputsContainer = styled.div`
  display: flex;
  width: 300px;
`;

const SmallInput = styled.input`
  margin-right: 10px;

  border-radius: 8px;
  width: 135px
`;

const SubscribeButton = styled.button`
  background-color: pink;
  color: white;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
`;

const ModalText = styled.p`
  color: black`;

const ModalButtonsContainer = styled.div`
  display: flex;
`;

const ModalButton = styled.button``;
