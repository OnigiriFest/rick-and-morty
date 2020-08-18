import React from 'react';

import Navbar from './Navbar';
import Card from './Card';

const App = () => {
  return (
    <>
      <div className="bg-gray-900">
        <Navbar />
        <div className="container m-auto pb-8 px-5">
          <Card
            name="Krombopulos Michael"
            image="https://rickandmortyapi.com/api/character/avatar/196.jpeg"
          />
          <Card
            name="Cop Rick"
            image="https://rickandmortyapi.com/api/character/avatar/74.jpeg"
          />
        </div>
      </div>
    </>
  );
};

export default App;
