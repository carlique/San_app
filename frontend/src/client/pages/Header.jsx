import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';


export default class Header extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">SAN</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{ pathname: '/contacts' }}>
              <NavItem eventKey={1}>Kontakty</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/calculations' }}>
              <NavItem eventKey={2}>Kalkulace</NavItem>
            </LinkContainer>
            <NavItem eventKey={3} href="#">Fakturace</NavItem>
            <NavItem eventKey={4} href="#">Zařízení</NavItem>
            <NavDropdown eventKey={5} title="Nastavení" id="basic-nav-dropdown">
              <LinkContainer to={{ pathname: '/contacts' }}>
                <MenuItem eventKey={5.1}>Kontakty</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={5.2}>Another action</MenuItem>
              <MenuItem eventKey={5.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={4.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NotAuthenticated>
              <li><LoginLink /></li>
            </NotAuthenticated>
            <Authenticated>
              <li><LogoutLink /></li>
            </Authenticated>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
