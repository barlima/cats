import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import UserContext from '../context/user';
import { resetUser } from '../reducers/user';
import { Menu } from 'semantic-ui-react'

const Wrapper = styled.div`
  margin: 10px;
`

const Header = (props) => {
  const [ user, dispatch ] = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(resetUser());
    props.history.push('/');
  }

  return (
    <Wrapper>
      <Menu>
        <Link to="/">
          <Menu.Item>Vote</Menu.Item> 
        </Link>
        <Link to="/top">
          <Menu.Item>Top</Menu.Item> 
        </Link>
        {
          user.admin && (
            <>
              <Link to="/cats">
                <Menu.Item>All Cats</Menu.Item> 
              </Link>
              <Link to="/statistics">
                <Menu.Item>Statistics</Menu.Item> 
              </Link>
            </>
          )
        }
        <Menu.Menu position='right'>
          <Menu.Item onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Wrapper>
  )
}

export default withRouter(Header);