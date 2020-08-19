import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCharacters, clearCharacters } from '../redux/charsDuck';

const SearchBar = ({ getCharacters, clearCharacters, chars }: any) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedInput.length < 3) {
      return;
    }

    getCharacters(debouncedInput);
  }, [debouncedInput, getCharacters]);

  const resetInput = () => {
    setInput('');

    clearCharacters();
  };

  return (
    <>
      <div className="self-center h-10 rounded-l-full bg-gray-900 flex">
        <svg
          className="self-center text-gray-400 ml-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className={`h-10 self-center w-full px-2 min-w-0 bg-gray-900 text-white ${
          input === '' && chars.results && chars.results.length === 0
            ? 'rounded-r-full'
            : ''
        }`}
      />
      {input === '' && chars.results && chars.results.length === 0 ? null : (
        <button
          onClick={resetInput}
          className="self-center h-10 rounded-r-full bg-gray-900 flex">
          <svg
            className="mr-2 self-center text-gray-400"
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
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    chars: state.characters,
  };
};

export default connect(mapStateToProps, { getCharacters, clearCharacters })(
  SearchBar
);
