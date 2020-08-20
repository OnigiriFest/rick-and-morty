import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../redux/store';
import { fetchCharacter } from '../redux/charsDuck';
import { fetchEpisode } from '../redux/episodeDuck';
import { fetchLocation } from '../redux/locationDuck';

import { AppActions } from '../types/actions';
import CharacterResults from '../types/CharacterResults';
import EpisodeResults from '../types/EpisodeResults';
import LocationResults from '../types/LocationResults';
import Character from '../types/Character';

interface ViewItemProps {
  toggleModal: (show: boolean) => any;
  showModal: boolean;
  index: number;
  type: string;
}

type Props = ViewItemProps & LinkStateToProps & LinkDispatchToProps;

const ViewItem = ({
  toggleModal,
  showModal,
  index,
  type,
  fetchCharacter,
  fetchEpisode,
  fetchLocation,
  characters,
  episodes,
  locations,
}: Props) => {
  let imageStyles = {
    backgroundImage: `url(${
      type === 'characters' && characters.results
        ? characters.results[index].image
        : ''
    })`,
    backgroundRepeat: 'no-reapeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '350px',
  };

  useEffect(() => {
    switch (type) {
      case 'characters':
        fetchCharacter(index);
        return;
      case 'episodes':
        fetchEpisode(index);
        return;
      case 'locations':
        fetchLocation(index);
        return;
      default:
        return;
    }
  }, [index, type, fetchCharacter, fetchEpisode, fetchLocation]);

  const renderCharactersList = (charactersList: Character[] | undefined) => {
    if (charactersList) {
      return charactersList.map((character) => <li>{character.name}</li>);
    }
    return null;
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
        {/* ------------------ CHARACTER ---------------------- */}

        {type === 'characters' && characters.results && (
          <div>
            <div
              className="rounded-t-lg flex justify-end p-2"
              style={imageStyles}>
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
              <p className="text-center font-bold text-lg mt-2">
                {characters.results[index].name}
              </p>
              {characters.results[index].species !== '' && (
                <p className="py-2">
                  <span className="text-gray-500 text-sm">Especie: </span>
                  {characters.results[index].species}
                </p>
              )}
              {characters.results[index].type !== '' && (
                <p className="pb-2">
                  <span className="text-gray-500 text-sm">Tipo: </span>
                  {characters.results[index].type}
                </p>
              )}
              {characters.results[index].gender !== '' && (
                <p>
                  <span className="text-gray-500 text-sm">Genero: </span>
                  {characters.results[index].gender}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ------------------ EPISODE ---------------------- */}

        {type === 'episodes' && episodes.results && (
          <div className="flex">
            <div className="px-8">
              <p className="text-center font-bold text-lg mt-2">
                {episodes.results[index].name}
              </p>
              {episodes.results[index].episode !== '' && (
                <p className="py-2">
                  <span className="text-gray-500 text-sm">Episode: </span>
                  {episodes.results[index].episode}
                </p>
              )}
              {episodes.results[index].air_date !== '' && (
                <p className="pb-2">
                  <span className="text-gray-500 text-sm">
                    Fecha de Estreno:{' '}
                  </span>
                  {episodes.results[index].air_date}
                </p>
              )}
              {episodes.results[index].characters &&
                episodes.results[index].characters![0].name !== null && (
                  <div>
                    <p className="pb-2">
                      <span className="text-gray-500 text-sm">
                        Primeros 5 personajes que aparecen en el episodio:{' '}
                      </span>
                    </p>
                    <ul className="list-disc pl-4">
                      {renderCharactersList(episodes.results[index].characters)}
                    </ul>
                  </div>
                )}
            </div>
            <div className="p-2">
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
        )}

        {/* ------------------ LOCATION ---------------------- */}

        {type === 'locations' && locations.results && (
          <div className="flex">
            <div className="px-8">
              <p className="text-center font-bold text-lg mt-2">
                {locations.results[index].name}
              </p>
              {locations.results[index].dimension !== '' && (
                <p className="py-2">
                  <span className="text-gray-500 text-sm">Dimensión: </span>
                  {locations.results[index].dimension}
                </p>
              )}
              {locations.results[index].type !== '' && (
                <p className="pb-2">
                  <span className="text-gray-500 text-sm">Tipo: </span>
                  {locations.results[index].type}
                </p>
              )}
              {locations.results[index].residents &&
                locations.results[index].residents![0].name !== null && (
                  <div>
                    <p className="pb-2">
                      <span className="text-gray-500 text-sm">
                        Primeros 5 personajes que aparecen en el episodio:{' '}
                      </span>
                    </p>
                    <ul className="list-disc pl-4">
                      {renderCharactersList(locations.results[index].residents)}
                    </ul>
                  </div>
                )}
            </div>
            <div className="p-2">
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
        )}
      </div>
    </div>,
    document.querySelector('#modal')!
  );
};

interface LinkStateToProps {
  characters: CharacterResults;
  episodes: EpisodeResults;
  locations: LocationResults;
}

interface LinkDispatchToProps {
  fetchCharacter: (index: number) => void;
  fetchEpisode: (index: number) => void;
  fetchLocation: (index: number) => void;
}

const mapStateToProps = (state: AppState): LinkStateToProps => ({
  characters: state.characters,
  episodes: state.episodes,
  locations: state.location,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchToProps => ({
  fetchCharacter: bindActionCreators(fetchCharacter, dispatch),
  fetchEpisode: bindActionCreators(fetchEpisode, dispatch),
  fetchLocation: bindActionCreators(fetchLocation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);
