import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Label, List } from 'semantic-ui-react'

const Statistics = () => {
  const [ statistics, setStatistics ] = useState({});

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization': "bearer " + token}
    };
    const res = await axios.get('http://localhost:3001/api/v1/statistics', config);
    setStatistics(res.data);
  }

  useEffect(() => {
    fetchStats()
  }, []);

  return (
    // <div>
    //   <p>{statistics.users_total}</p>
    //   <p>{statistics.active_users}</p>
    //   <p>{statistics.users_avg}</p>
    //   <p>{statistics.cats_total}</p>
    //   <p>{statistics.cats_avg}</p>
    // </div>
    <List divided selection>
    <List.Item>
      <Label color='red' horizontal>
        Users Total
      </Label>
      {statistics.users_total}
    </List.Item>
    <List.Item>
      <Label color='red' horizontal>
        Active Users
      </Label>
      {statistics.active_users}
    </List.Item>
    <List.Item>
      <Label color='red' horizontal>
        Avg Votes per User
      </Label>
      {statistics.users_avg}
    </List.Item>
    <List.Item>
      <Label color='purple' horizontal>
        Cats Total
      </Label>
      {statistics.cats_total}
    </List.Item>
    <List.Item>
      <Label color='purple' horizontal>
        Avg Votes per Cat
      </Label>
      {statistics.cats_avg}
    </List.Item>
  </List>
)
}

export default Statistics;