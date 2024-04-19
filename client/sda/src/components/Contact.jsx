import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "../css-assets/ContactUs.css";
import axios from "axios";

function Contact() {
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [details, setDetails] = useState();
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setShowConfirmation(true);
    }
    setValidated(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    sendEmail();
    resetForm();
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setDetails("");
    setSelectedJob("");
    setSelectedFile(null);
    setValidated(false);
    formRef.current.reset();
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleDetails = (event) => {
    setDetails(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleJobSelection = (event) => {
    setSelectedJob(event.target.value);
    setShowDescription(true);
  };

  const [showDescription, setShowDescription] = useState(true);
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleRadioChange = (event) => {
    setHowDidYouHear(event.target.value);
  };

  const sendEmail = () => {
    if (!showConfirmation) {
      return;
    }
    const formData = new FormData();
    formData.append("selectedOption", selectedOption);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("details", details);
    formData.append("selectedJob", selectedJob);
    formData.append("file", selectedFile);
    formData.append("how", howDidYouHear);

    axios
      .post("https://josephrep-jvhms.vercel.app/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Success");
      })
      .catch(() => {
        console.log("Failure");
      });
  };

  return (
    <Container className="contact-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Container className="sms-container">
            <h1 xs={3} className="contact-h1">
              Hello!
              <br />
              We’re glad
              <br />
              you’re here
            </h1>
          </Container>
          <p>
            We'd love to hear from you. Please fill in the form below and we'll
            respond to you in a timely manner.
          </p>

          <Form.Label>Type of Inquiry</Form.Label>
          <Form.Select
            size="lg"
            required
            aria-label="Open this select menu"
            className="inquiry-select"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Product Inquir">Product Inquiry</option>
            <option value="Claim Inquiry">Claim Inquiry</option>
            <option value="Customer Feedback">Customer Feedback</option>
            <option value="Career">Career</option>
          </Form.Select>

          {selectedOption === "Career" && (
            <div>
              <Form.Label>What job do you want to apply for?</Form.Label>

              <Form.Select
                size="md"
                required
                aria-label="Open this select menu"
                className="job-inquiry-select"
                onChange={handleJobSelection}
                value={selectedJob}
              >
                <option value=""></option>
                <option value="Financial Advisor">Financial Advisor</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Risk Manager">Risk Manager</option>
                <option value="Marketing Specialist">
                  Marketing Specialist
                </option>
                <option value="Loss Control Specialist">
                  Loss Control Specialist
                </option>
                <option value="Technical Support">Technical Support</option>
              </Form.Select>

              {selectedJob !== "" && (
                <Button
                  className="job-inquiry-show-hide"
                  variant="link"
                  onClick={toggleDescription}
                >
                  {showDescription
                    ? "Hide Job Description"
                    : "Show Job Description"}
                </Button>
              )}
            </div>
          )}

          {showDescription && (
            <Container
              className="job-description-container"
              style={{ display: selectedJob ? "block" : "none" }}
            >
              {selectedOption === "Career" &&
                selectedJob === "Financial Advisor" && (
                  <p
                    className="job-description"
                    style={{ display: showDescription ? "block" : "none" }}
                  >
                    As a Financial Advisor, you will be responsible for
                    understanding clients' financial objectives and crafting
                    personalized strategies to help them achieve their goals.
                    You will assess clients' financial situations, including
                    their income, assets, liabilities, and risk tolerance, to
                    develop comprehensive financial plans. Your role involves
                    providing recommendations on investment opportunities,
                    retirement planning, estate planning, tax strategies,
                    insurance needs, and other financial matters.
                  </p>
                )}

              {selectedOption === "Career" &&
                selectedJob === "Customer Service" && (
                  <p
                    className="job-description"
                    style={{ display: showDescription ? "block" : "none" }}
                  >
                    Customer service representatives handle inquiries,
                    complaints, and policy changes from policyholders. They
                    provide assistance and support to customers regarding their
                    insurance policies.
                  </p>
                )}

              {selectedOption === "Career" &&
                selectedJob === "Risk Manager" && (
                  <p
                    className="job-description"
                    style={{ display: showDescription ? "block" : "none" }}
                  >
                    Risk managers identify, assess, and manage risks within an
                    insurance company. They develop strategies to minimize
                    potential losses and ensure compliance with regulations.
                  </p>
                )}

              {selectedOption === "Career" &&
                selectedJob === "Marketing Specialist" && (
                  <p
                    className="job-description"
                    style={{ display: showDescription ? "block" : "none" }}
                  >
                    {" "}
                    Marketing specialists develop and implement marketing
                    strategies to promote insurance products and services. They
                    conduct market research, create advertising campaigns, and
                    manage digital and traditional marketing channels.
                  </p>
                )}

              {selectedOption === "Career" &&
                selectedJob === "Loss Control Specialist" && (
                  <p
                    className="job-description"
                    style={{ display: showDescription ? "block" : "none" }}
                  >
                    {" "}
                    Loss control specialists work to prevent or minimize losses
                    for insurance companies and their policyholders. They assess
                    risks, develop safety programs, and provide recommendations
                    to mitigate potential hazards.
                  </p>
                )}

              {selectedOption === "Career" &&
                selectedJob === "Technical Support" && (
                  <p
                    className="job-description"
                    style={{ display: showDescription ? "block" : "none" }}
                  >
                    {" "}
                    A technical support job involves providing assistance and
                    guidance to users who are experiencing technical issues with
                    hardware, software, or other electronic devices.
                  </p>
                )}
            </Container>
          )}

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <FloatingLabel
              controlId="floatingInputFN"
              label="Last Name, First Name I."
            >
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                value={fullName}
                onChange={handleFullName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>

        <InputGroup hasValidation>
          <Form.Floating className="mb-3">
            <Form.Control
              required
              id="floatingInputEA"
              type="email"
              placeholder=""
              value={email}
              onChange={handleEmail}
            />
            <label htmlFor="floatingInputEA">Email Address</label>
            <Form.Control.Feedback type="invalid">
              Please provide email address{" "}
            </Form.Control.Feedback>
          </Form.Floating>
        </InputGroup>

        <InputGroup hasValidation>
          <Form.Floating className="mb-3">
            <Form.Control
              required
              id="floatingInputPN"
              type="phone"
              pattern="[0-9]*"
              placeholder=""
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
            <label htmlFor="floatingInputPN">Phone Number</label>
            <Form.Control.Feedback type="invalid">
              Please provide phone number{" "}
            </Form.Control.Feedback>
          </Form.Floating>
        </InputGroup>

        <div>
          {selectedOption !== "Career" && (
            <div>
              <Row className="mb-3">
                <p>How did you hear about us?</p>
                <Form>
                  {[
                    "Search Engine",
                    "Google Ads",
                    "Facebook Ads",
                    "Youtube Ads",
                    "TV",
                    "Word of Mouth",
                  ].map((label, index) => (
                    <div key={`inline-radio-${index}`} className="mb-3">
                      <Row>
                        <Col>
                          <Form.Check
                            required
                            label={label}
                            name="group1"
                            type="radio"
                            id={`inline-radio-${index}`}
                            value={label}
                            checked={howDidYouHear === label}
                            onChange={handleRadioChange}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Form>
              </Row>

              <Form.Group controlId="detailsTextArea" className="mb-3">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  value={details}
                  onChange={handleDetails}
                />
              </Form.Group>
            </div>
          )}

          {selectedOption === "Career" && (
            <Form.Group controlId="formFile" className="mb-3 resume-btn">
              <Form.Label>Upload PDF or DOCX of Résumé file</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.docx"
                size="md"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div>
                  <Button
                    variant="link"
                    onClick={() =>
                      window.open(URL.createObjectURL(selectedFile))
                    }
                  >
                    View selected file
                  </Button>
                </div>
              )}
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Check
              required
              label={
                <span>
                  I have read, understand and given my consent for SDA to
                  collect, use and disclose my personal data in accordance to
                  the{" "}
                  <a href="/privacy-declaration" target="_blank">
                    Privacy Declaration
                  </a>{" "}
                  given.
                </span>
              }
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
        </div>
        <Button type="submit">Submit</Button>
      </Form>
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure all details are filled and correct?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseConfirmation}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contact;
