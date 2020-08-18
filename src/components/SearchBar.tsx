import React, { useState, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { getCharacters, clearCharacters } from '../redux/charsDuck';

const SearchBar = (props: any) => {
  const [input, setInput] = useState('');

  const onSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (input.length < 2) {
      return;
    }

    props.getCharacters(input);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    onSubmit();
  };

  const resetInput = () => {
    setInput('');

    props.clearCharacters();
  };

  return (
    <>
      <button
        onClick={(e) => onSubmit()}
        className="self-center h-10 rounded-l-full bg-white flex">
        <svg
          className="ml-2 self-center"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="#4A5568"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <form onSubmit={(e) => onSubmit(e)} className="w-full self-center">
        <input
          value={input}
          onChange={(e) => onChange(e)}
          type="text"
          className="h-10 w-full px-2 min-w-0"
        />
      </form>
      <button
        onClick={resetInput}
        className="self-center h-10 rounded-r-full bg-white flex">
        <svg
          className="mr-2 self-center"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="#4A5568"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
};

export default connect(null, { getCharacters, clearCharacters })(SearchBar);
