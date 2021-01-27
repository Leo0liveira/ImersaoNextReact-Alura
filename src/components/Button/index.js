import react from 'react';
import styled from 'styled-components';


const BotaoJogar = styled.button`
  background: #30271e;
  color: #fbf5de;
  border-radius: .2rem;
  border: none;

  width: 100%;
  padding: .4rem;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    background: #706677;
  }
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;
export default BotaoJogar;