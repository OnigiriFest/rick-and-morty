import React from 'react';

interface CardData {
  image?: string;
  name: string;
  data?: string;
}

const Card = ({ image = '', name, data = '' }: CardData) => {
  let imageStyles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-reapeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '300px',
  };

  return (
    <div className="w-full max mt-8 rounded-lg bg-gray-700 shadow-md">
      <div style={imageStyles} className="rounded-t-lg"></div>
      <div className="p-3 text-white font-bold">{name}</div>
    </div>
  );
};

export default Card;
