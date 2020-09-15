import React from 'react';

import SearchBar from './SearchBar';
import Filter from './Filter';

const Navbar = () => (
  <div className="w-full bg-black px-4 pt-2 pb-1 flex flex-wrap sm:flex-no-wrap">
    <div className="m-auto mb-3">
      <img src="/menu-logo.png" alt="" className="w-56" />
    </div>
    <div className="flex w-full sm:ml-3">
      <div className="self-center w-full">
        <SearchBar />
      </div>
      <Filter />
    </div>
  </div>
);

export default Navbar;
