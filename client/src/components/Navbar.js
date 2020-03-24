import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import BsNavbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

const Icon = styled.i`
  width: fit-content;
  height: fit-content;
  line-height: 1;
  font-size: 38px;
  margin: 0;
  color: ${props => props.theme.colors.foreground};
  opacity: ${props => (props.active ? 1 : 0.6)};
  text-shadow: 0px 0px 4px ${props => props.theme.colors.foreground};
`;

const NavbarRoot = styled(BsNavbar)`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.foreground} !important;
  box-shadow: 0px 0px 15px 0.5px ${props => props.theme.colors.accent};
  height: 60px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  width: 100%;
`;

const NavLink = styled(Link)`
  color: #fff !important;
  margin-bottom: 0;
  height: 60px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
`;

export default function Navbar() {
  const location = useLocation();

  const links = [
    { icon: 'home', route: '/' },
    { icon: 'date_range', route: '/daily' },
    { icon: 'person_outline', route: '/profile' },
    { icon: 'error_outline', route: '/sos' },
  ].map(link => (
    <NavLink key={link.route} to={link.route}>
      <Icon active={location.pathname === link.route} className="material-icons-outlined">
        {link.icon}
      </Icon>
    </NavLink>
  ));

  return (
    <NavbarRoot fixed="bottom">
      <Container>
        <Nav>{links}</Nav>
      </Container>
    </NavbarRoot>
  );
}
