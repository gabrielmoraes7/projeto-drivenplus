import React from 'react';
import styled from 'styled-components';

export default function PerkCard({ perk }) {
  return (
    <PerkButton onClick={() => window.open(perk.link)}>
      {perk.title}
    </PerkButton>
  );
}

const PerkButton = styled.button`
  width: 299px;
  height: 52px;
  background-color: #FF4791;
  border-radius: 8px;
  color: white;
  margin: 3px;
`;
