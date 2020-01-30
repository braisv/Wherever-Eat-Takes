import React from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

const StyledBurger = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:focus {
    outline: none;
  }

  @media (min-width: 576px) {
    display:none
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => open ? '#0D0C1D' : '#EFFFFA'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger onClick={() => setOpen(!open)}>
      <FontAwesomeIcon icon={faBars} size="3x" />
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
