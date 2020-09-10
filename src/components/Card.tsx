import React, { useState } from 'react';

import ViewItem from './ViewItem';

interface CardProps {
  image?: string;
  name: string;
  data?: string;
  type: string;
  dimension?: string;
  episode?: string;
  index: number;
}

type Props = CardProps;

const Card = ({ image = '', name, type, dimension, episode, index }: Props) => {
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
      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max mt-8 bg-gray-900">
      <div className="w-11/12">
        <div className="m-auto bg-gray-700 rounded-lg shadow-md cursor-pointer">
          {type === 'characters' ? (
            <>
              <div style={imageStyles} className="rounded-t-lg"></div>
              <div className="p-3 text-white font-bold">{name}</div>
            </>
          ) : null}
          {type === 'locations' ? (
            <>
              <div className="p-3 xl:m-5 text-white font-bold">{name}</div>
              <div className="p-3 pt-0 xl:m-5 text-gray-300">{dimension}</div>
            </>
          ) : null}
          {type === 'episodes' ? (
            <>
              <div className="p-3 xl:m-5 text-white font-bold">{name}</div>
              <div className="p-3 pt-0 xl:m-5 text-gray-300">{episode}</div>
            </>
          ) : null}
          {showModal ? (
            <ViewItem
              index={index}
              type={type}
              toggleModal={setShowModal}
              showModal={showModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
