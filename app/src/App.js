import React, { useReducer } from 'react';
import UserContext from './context/user';
import AppRouter from './routers/AppRouter';
import userReducer from './reducers/user';


const App = () => {
  return (
    <UserContext.Provider value={useReducer(userReducer, {})}>
      <AppRouter />
    </UserContext.Provider>
  )
}

export default App;
