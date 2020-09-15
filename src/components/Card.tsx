import React, { useState } from 'react';

import ViewItem from './ViewItem';

interface Props {
  image?: string;
  name: string;
  data?: string;
  type: string;
  dimension?: string;
  episode?: string;
  index: number;
}

const Card = ({ image = '', name, type, dimension, episode, index }: Props) => {
  let imageStyles = {
    backgroundImage: `url(${image})`,
  };

  const [showModal, setShowModal] = useState(false);

  const renderCardInfo = () => {
    if (type === 'characters') {
      return (
        <>
          <div style={imageStyles} className="card-image rounded-t-lg"></div>
          <div className="p-3 text-white font-bold">{name}</div>
        </>
      );
    } else if (type === 'locations') {
      return (
        <>
          <div className="p-3 xl:m-5 text-white font-bold">{name}</div>
          <div className="p-3 pt-0 xl:m-5 text-gray-300">{dimension}</div>
        </>
      );
    } else if (type === 'episodes') {
      return (
        <>
          <div className="p-3 xl:m-5 text-white font-bold">{name}</div>
          <div className="p-3 pt-0 xl:m-5 text-gray-300">{episode}</div>
        </>
      );
    } else {
      return null;
    }
  };

  const renderModal = () =>
    showModal && (
      <ViewItem
        index={index}
        type={type}
        toggleModal={setShowModal}
        showModal={showModal}
      />
    );

  return (
    <div
      onClick={() => setShowModal(!showModal)}
      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max mt-8 bg-gray-900">
      <div className="w-11/12">
        <div className="m-auto bg-gray-700 rounded-lg shadow-md cursor-pointer">
          {renderCardInfo()}
          {renderModal()}
        </div>
      </div>
    </div>
  );
};

export default Card;
