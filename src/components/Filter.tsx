import React, { useState, ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../redux/filterDuck';
import { AppState } from '../redux/store';
import FilterType from '../types/Filter';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { bindActionCreators } from 'redux';

interface FiltersProps {}

type Props = FiltersProps & LinkStateToProps & LinkDispatchToProps;

const Filter = ({ setFilter }: Props) => {
  const [hideMenu, setHideMenu] = useState(true);
  const [selected, setSelected] = useState('characters');

  useEffect(() => {
    setFilter({ name: selected });
  }, [selected, setFilter]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className="relative flex">
      <button
        onClick={() => setHideMenu(false)}
        className="text-white flex ml-2 self-center">
        <div className="self-center text-blue-300">Filtrar</div>
        <svg
          className="self-center text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Menu */}
      <div
        className={`${
          hideMenu ? 'hidden' : ''
        } absolute top-0 right-0 bg-gray-700 text-white py-4 px-4 rounded-md`}>
        <div className="flex ">
          <div>
            <div className="flex mb-3">
              <input
                className="mr-2"
                id="characters"
                value="characters"
                type="radio"
                name="filter"
                onChange={(e) => onChange(e)}
                defaultChecked
              />
              <label htmlFor="characters">Personajes</label>
            </div>
            <div className="flex mb-3">
              <input
                className="mr-2"
                id="locations"
                value="locations"
                type="radio"
                name="filter"
                onChange={(e) => onChange(e)}
              />
              <label htmlFor="locations">Lugares</label>
            </div>
            <div className="flex">
              <input
                className="mr-2"
                id="episodes"
                value="episodes"
                type="radio"
                name="filter"
                onChange={(e) => onChange(e)}
              />
              <label htmlFor="episodes">Episodios</label>
            </div>
          </div>
          <div className="ml-4">
            <button onClick={() => setHideMenu(true)} className="mb-3">
              <svg
                className="self-center text-gray-400"
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
      </div>
    </div>
  );
};

interface LinkStateToProps {
  filter: FilterType;
}

interface LinkDispatchToProps {
  setFilter: (filter: FilterType) => void;
}

const mapStateToProps = (state: AppState): LinkStateToProps => ({
  filter: state.filter,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchToProps => ({
  setFilter: bindActionCreators(setFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);