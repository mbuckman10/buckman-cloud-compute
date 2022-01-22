import React, { CSSProperties } from "react";
import { Navbar, Row, Col } from "react-bootstrap";

const footerContainer: CSSProperties = {
  position: "fixed",
  right: "0",
  bottom: "0",
  left: "0",
  zIndex: "1030",
  fontSize: "10pt",
};

const footerRow: CSSProperties = {
  width: "100%",
};

const footerText: CSSProperties = {
  margin: "5px 0;",
};

export default class Footer extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render(): React.ReactElement {
    return (
      <footer style={footerContainer}>
        <Navbar bg="light" expand="lg" className="px-5">
          <Row style={footerRow}>
            <Col sm="6">
              <p style={footerText}>Michael Buckman &copy;2022</p>
            </Col>
          </Row>
        </Navbar>
      </footer>
    );
  }
}