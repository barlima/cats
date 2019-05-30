import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Menu, Image } from 'semantic-ui-react'

const CompactMenu = styled(Menu)`
&&&{
  widht: 50%;
  margin: 0 25%;
}
`

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
  margin: 10px 10%;
  width: 30%
`

const Top = () => {
  const [ cats, setCats ] = useState([]);
  const [ period, setPeriod ] = useState(null);

  const fetchCats = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization': "bearer " + token},
      params: {
        period: period
      }
    };
    
    const res = await axios.get('http://localhost:3001/api/v1/cats/top_ten', config);
    setCats(res.data);
  }

  useEffect(() => {
    fetchCats()
  }, [period]);


  return (
    <>
      <CompactMenu compact>
        <Menu.Item
          onClick={() => setPeriod(null)}
          active={!period}
        >
          Total
        </Menu.Item>
        <Menu.Item
          onClick={() => setPeriod('day')}
          active={period === 'day'}
        >
          Last Day
        </Menu.Item>
        <Menu.Item
          onClick={() => setPeriod('week')}
          active={period === 'week'}
        >
          Last Week
        </Menu.Item>
        <Menu.Item
          onClick={() => setPeriod('month')}
          active={period === 'month'}
        >
          Last Month
        </Menu.Item>
      </CompactMenu>
      <List>
        { cats.map((cat, index) => 
          <Card key={cat.id}>
            <span>#{index+1}</span>
            <span>Score: {cat.score}</span>
            <Image src={cat.url} alt="Image not found" size="medium"/>
          </Card>    
        )}
      </List>
    </>
  )
}

export default Top;
