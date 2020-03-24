import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import BarLoader from 'react-spinners/BarLoader';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import UserContext from '../contexts/UserContext';
import Button from '../styles/Button';

const LoaderContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Auth(props) {
  const [chronicDiseases, setChronicDiseases] = useState(false);
  const [contact, setContact] = useState(false);
  const [dangerousAge, setDangerousAge] = useState(false);
  const [name, setName] = useState('');
  const [sex, setSex] = useState('Do not tell');

  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);

  if (userContext.loading) {
    return (
      <LoaderContainer>
        <BarLoader color={themeContext.colors.success} height="6" width="200" />
      </LoaderContainer>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    userContext.authenticate({ dangerousAge, chronicDiseases, contact, name, sex });
  }

  if (!userContext.authenticated) {
    return (
      <Container>
        <Form className="mt-3 d-flex justify-content-center flex-column" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Tell us your full name"
              value={name}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your sex</Form.Label>
            <Form.Control as="select" onChange={e => setSex(e.target.value)} value={sex}>
              <option>Do not tell</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <div className="d-flex align-items-center custom-control custom-checkbox custom-checkbox-success mb-3">
            <input
              className="custom-control-input"
              checked={dangerousAge}
              id="dangerousAge"
              type="checkbox"
              onChange={e => setDangerousAge(e.target.checked)}
            />
            <label className="custom-control-label" htmlFor="dangerousAge">
              I am older than 60
            </label>
          </div>

          <div className="d-flex align-items-center custom-control custom-checkbox custom-checkbox-success mb-3">
            <input
              className="custom-control-input"
              checked={chronicDiseases}
              id="chronicDiseases"
              type="checkbox"
              onChange={e => setChronicDiseases(e.target.checked)}
            />
            <label className="custom-control-label" htmlFor="chronicDiseases">
              I have chronic diseases
            </label>
          </div>

          <div className="d-flex align-items-center custom-control custom-checkbox custom-checkbox-success mb-3">
            <input
              className="custom-control-input"
              checked={contact}
              id="contact"
              type="checkbox"
              onChange={e => setContact(e.target.checked)}
            />
            <label className="custom-control-label" htmlFor="contact">
              I contact with people infected with COVID-19
            </label>
          </div>

          <Button block disabled={name.length === 0} variant="success" type="submit">
            submit
          </Button>
        </Form>
      </Container>
    );
  }

  return props.children;
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
