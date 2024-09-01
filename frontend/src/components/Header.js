import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import '../styles/Header.css';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className="custom-navbar" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          {/* Logo on the left */}
          <LinkContainer to="/">
            <Navbar.Brand className="custom-logo-container">
              <img
                src="/napisHustleteesWhite.png"
                alt="HustleTees Logo"
                className="custom-logo"
              />
            </Navbar.Brand>
          </LinkContainer>

          {/* Navbar toggler for smaller screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar collapse for navigation items */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Align items to the right */}
            <Nav className="ms-auto"> {/* ms-auto class will push nav items to the right in Bootstrap 5 */}
              {/* Cart link */}
              <LinkContainer to="/cart">
                <Nav.Link className="nav-item-large">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {/* Profile or Login link based on user authentication status */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" className="nav-item-large">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-item-large">
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
