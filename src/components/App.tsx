import React from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Card from './Card';

const App = (props: any) => {
  const renderCharacters = () => {
    return props.chars.results.map((char: any) => {
      return <Card key={char.id} name={char.name} image={char.image} />;
    });
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container m-auto pb-8 px-5">{renderCharacters()}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    chars: state.characters,
  };
};

export default connect(mapStateToProps)(App);
