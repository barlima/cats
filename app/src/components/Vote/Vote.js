import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Header, Button, Image } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Cat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 10px;
`


const Vote = () => {
  const [ catsPair, setCatsPair ] = useState([]);

  const fetchCats = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization': "bearer " + token}
    };
    const res = await axios.get('http://localhost:3001/api/v1/cats_pair', config);
    setCatsPair(res.data);
  }

  const vote = async id => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization': "bearer " + token}
    };

    const data = {
      "vote": { "cat_id": id }
    };

    const res = await axios.post('http://localhost:3001/api/v1/vote', data, config);
    
    if(res.data.status === 200) {
      fetchCats();
    }
  }

  useEffect(() => {
    fetchCats()
  }, []);

  return (
    <Container>
      { catsPair.map(cat => (
        <Cat key={cat.id}>
          <Header as="h5" textAlign="center">{cat.title}</Header>
          <Image src={cat.url} alt="Image not found" size="medium"/>
          <br/>
          <Button primary fluid onClick={() => vote(cat.id)}>Vote!</Button>
        </Cat>
        ))
      }
    </Container>
  )
}

export default Vote;