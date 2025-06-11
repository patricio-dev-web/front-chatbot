// Home.js
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  console.log(user.username)


  return (
    <div>
      <h2>Bienvenido, {user.username}!</h2>
      <p>aaaaaaaaaaaaaaaaaaaaaaaa</p>
    </div>
  );
}

export default Home;
