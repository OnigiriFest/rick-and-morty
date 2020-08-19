import React from 'react';

interface CardData {
  image?: string;
  name: string;
  data?: string;
  type: string;
  dimension?: string;
}

const Card = ({ image = '', name, type, dimension }: CardData) => {
  let imageStyles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-reapeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '300px',
  };

  return (
    <div className="w-full max mt-8 rounded-lg bg-gray-700 shadow-md">
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
    </div>
  );
};

export default Card;
