import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: calc(100%/3 - 20px);
`

const Cats = () => {
  const [ cats, setCats ] = useState([]);
  const [ slowCats, setSlowCats ] = useState([])

  const fetchCats = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization': "bearer " + token}
    };
    const res = await axios.get('http://localhost:3001/api/v1/cats', config);
    setCats(res.data);
  }

  const loadMore = () => setSlowCats(cats.slice(0, slowCats.length + 9))
  const hasMore = () => slowCats.length < cats.length;

  useEffect(() => {
    fetchCats()
  }, []);

  useEffect(() => {
    setSlowCats(cats.slice(0, 9));
  }, [cats])

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore()}
      loader={<p key={0}>Loading ...</p>}
    >
      <List>
        { slowCats.map(cat => 
          <Card key={cat.id}>
            <span>Score: {cat.score}</span>
            <span>Uploaded: {cat.created_at}</span>
            <img src={cat.url} alt="Image not found"/>
          </Card>    
        )}
      </List>
    </InfiniteScroll>
  )
}

export default Cats;