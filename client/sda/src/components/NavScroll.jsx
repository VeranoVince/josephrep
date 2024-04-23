import React, { useState, useEffect } from "react";
import { Button, Container, Form, Nav, Navbar, Modal } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css-assets/style.css";

function useScrollToTopEffect() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
    });
  };

  const handleClick = (path) => {
    if (path === location.pathname) {
      handleScrollToTop();
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    // Your existing code for different pages
    const handleMediaClick = () => {
      handleClick("/news");
    };

    const handleAboutUsClick = () => {
      handleClick("/about-us");
    };

    const handleContactUsClick = () => {
      handleClick("/contact-us");
    };

    const handleOrganizationClick = () => {
      handleClick("/organization");
    };

    // Cleanup if necessary
    return () => {
      // Cleanup if necessary
    };
  }, [location.pathname, navigate]);

  return {
    handleScrollToTop,
    handleClick,
  };
}

function NavScroll() {
  const { handleScrollToTop, handleClick } = useScrollToTopEffect();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignup = () => {
    setShowSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const generateGradientStyles = (startColor, endColor) => {
    return {
      background: `linear-gradient(to right, ${startColor}, ${endColor})`,
      color: "white",
      fontWeight: "bold",
    };
  };

  return (
    <>
      <Navbar
        xs={10}
        md={10}
        expand="lg"
        className="bg-orange-custom"
        style={{
          padding: "0.5rem 1rem",
          height: "110px",
        }}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" onClick={() => handleClick("/")}>
            <img
              src="/Images/SDALOGO.png"
              alt="SDATemp Logo"
              className="d-inline-block align-top img-fluid"
              style={{ maxHeight: "100px", marginLeft: "100px" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/*  <Nav.Link
                as={Link}
                to="/"
                onClick={() => handleClick("/")}
                className="white-text"
                style={{ paddingLeft: "200px" }}
              >
                Home
      </Nav.Link> */}

              <Nav.Link
                as={Link}
                to="/news"
                onClick={() => handleClick("/news")}
                className="white-text"
                style={{ paddingLeft: "450px" }}
              >
                NEWS & MEDIA
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about-us"
                onClick={() => handleClick("/about-us")}
                className="white-text"
                style={{ paddingLeft: "15px" }}
              >
                ABOUT
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact-us"
                onClick={() => handleClick("/contact-us")}
                className="white-text"
                style={{ paddingLeft: "15px" }}
              >
                CONTACT
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/organization"
                onClick={() => handleClick("/organization")}
                className="white-text"
                style={{ paddingLeft: "15px" }}
              >
                ORGANIZATION
              </Nav.Link>
            </Nav>
            <Form className="d-flex"></Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header
          closeButton
          style={generateGradientStyles("#f41d77", "#b91258")}
        >
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder="Email" />
            <br />
            <Form.Control type="text" placeholder="Password" />
            <br />
            <Button
              variant="secondary"
              type="submit"
              className="signin-btn"
              onClick={() => {
                handleCloseLoginModal();
              }}
            >
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavScroll;
