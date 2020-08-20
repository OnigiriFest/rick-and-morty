import React from 'react';
import ReactDOM from 'react-dom';

interface ViewItemProps {
  toggleModal: (show: boolean) => any;
  showModal: boolean;
}

type Props = ViewItemProps;

const ViewItem = ({ toggleModal, showModal }: Props) => {
  let imageStyles = {
    backgroundImage: `url(https://rickandmortyapi.com/api/character/avatar/21.jpeg)`,
    backgroundRepeat: 'no-reapeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '350px',
  };

  return ReactDOM.createPortal(
    <div
      onClick={() => toggleModal(!showModal)}
      className={`${
        showModal ? '' : 'hidden'
      } fixed inset-0 z-50 overflow-auto bg-gray-400 bg-opacity-75 flex`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="pb-8 bg-black w-full max-w-sm m-auto flex-col flex text-white rounded-lg">
        <div className="rounded-t-lg flex justify-end p-2" style={imageStyles}>
          <div>
            <button className="bg-black p-1 rounded-full">
              <svg
                onClick={() => toggleModal(!showModal)}
                className="self-center text-gray-100"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-8">
          <p className="text-center font-bold text-lg mt-2">Aqua Morty</p>
          <p className="py-2">
            <span className="text-gray-500 text-sm">Especie: </span>Humanoid
          </p>
          <p className="pb-2">
            <span className="text-gray-500 text-sm">Tipo: </span>Fish-Person
          </p>
          <p>
            <span className="text-gray-500 text-sm">Genero: </span>Male
          </p>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')!
  );
};

export default ViewItem;
