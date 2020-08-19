import React from 'react';

import Navbar from './Navbar';
import Results from './Results';

const App = () => {
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <Results />
      </div>
    </>
  );
};

export default App;
