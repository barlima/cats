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

const Login = (props) => {

  const handleLogin = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const request = {"auth": {"email": email, "password": password}};


    const res = await axios.post('http://localhost:3001/api/v1/user_token', request)

    if(res.data.jwt) {
      localStorage.setItem("token", res.data.jwt);
      props.history.push('/');
    } else {
      // Todo handle errors
    }
  }

  return(
    <Wrapper>
      <Segment placeholder>
        <Header as="h1" textAlign='center'>LOG IN</Header>

        <Form onSubmit={handleLogin}>
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
          <br />
          <Button 
            name="submit"
            id="submit"
            type="submit"
            className="button"
          >
            Log in
          </Button>
        </Form>
        <Note>
          {"New user? "}
          <Link to="/signup">
            Sign Up
          </Link>!
        </Note>
      </Segment>
    </Wrapper>
  )
}

export default Login;