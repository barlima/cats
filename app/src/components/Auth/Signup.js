import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Button, Header, Segment } from 'semantic-ui-react'

const Note = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`

const Wrapper = styled.div`
  width: 100%;
  heigth: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Signup = (props) => {
  const handleSignup = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;

    if(password !== passwordConfirmation || password.length === 0) {
      console.log('Invalid password');
      // ToDo: show message
      return null;
    }

    const request = {
      "user": {
        "email": email,
        "password": password
      }
    }

    const res = await axios.post('http://localhost:3001/api/v1/users/create', request)

    if(res.data.status === 200) {
      props.history.push('/login');
    } else {
      // Todo handle errors
    }
  }

  return(
    <Wrapper>
      <Segment placeholder>
        <Header as="h1" textAlign="center">SIGN UP</Header>

        <Form onSubmit={handleSignup}>
          <Form.Field>
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              id="email"
              type="email"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              id="password"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Confirm Password:</label>
            <input
              name="passwordConfirmation"
              id="passwordConfirmation"
              type="password"
            />
          </Form.Field>
          <br />
          <Button 
            name="submit"
            id="submit"
            type="submit"
            className="button"
          >
            Sign up
          </Button>
        </Form>
        <Note>
          {"or "}
          <Link to="/login">
            Log in
          </Link>!
        </Note>
      </Segment>
    </Wrapper>
  )
}

export default Signup;