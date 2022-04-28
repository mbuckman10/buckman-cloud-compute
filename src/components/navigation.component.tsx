import React, { CSSProperties } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.svg";
import { buckmanNavFill, logoImage, navLink } from "../styles/general";

export default class Navigation extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar style={buckmanNavFill}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* <div
                style={logoImage}
                dangerouslySetInnerHTML={{ __html: logo }}
              ></div> */}
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Nav className="mr-auto">
              <LinkContainer to="/" style={navLink}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/location" style={navLink}>
                <Nav.Link>Location</Nav.Link>
              </LinkContainer>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
