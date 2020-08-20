import React, { useState } from 'react';
import ViewItem from './ViewItem';

interface CardData {
  image?: string;
  name: string;
  data?: string;
  type: string;
  dimension?: string;
  episode?: string;
}

const Card = ({ image = '', name, type, dimension, episode }: CardData) => {
  let imageStyles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-reapeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '300px',
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={() => setShowModal(!showModal)}
      className="w-full max mt-8 rounded-lg bg-gray-700 shadow-md">
      {type === 'characters' ? (
        <>
          <div style={imageStyles} className="rounded-t-lg"></div>
          <div className="p-3 text-white font-bold">{name}</div>
        </>
      ) : null}
      {type === 'locations' ? (
        <>
          <div className="p-3 text-white font-bold">{name}</div>
          <div className="p-3 pt-0 text-gray-300">{dimension}</div>
        </>
      ) : null}
      {type === 'episodes' ? (
        <>
          <div className="p-3 text-white font-bold">{name}</div>
          <div className="p-3 pt-0 text-gray-300">{episode}</div>
        </>
      ) : null}
      {showModal ? (
        <ViewItem toggleModal={setShowModal} showModal={showModal} />
      ) : null}
    </div>
  );
};

export default Card;
