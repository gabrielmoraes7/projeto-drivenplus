import React from 'react';
import styled from 'styled-components';

export default function PlanCard({ plan, onSelect }) {
  return (
    <Card onClick={onSelect}>
      <CardImage src={plan.image} />
      <CardText>{plan.price}</CardText>
    </Card>
  );
}

const Card = styled.div`
  width: 290px;
  height: 180px;
  display: flex;
  border: thick solid white;
`;

const CardImage = styled.img``;

const CardText = styled.p`
  font-size: 24px;
  margin-left: auto;
  margin-right: auto;
`;
