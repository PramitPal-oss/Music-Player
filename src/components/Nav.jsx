/** @format */
import React from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';
//import '../styles/app.css';
import classes from './Nav.module.css';

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <nav>
      <h1>PMusic</h1>
      <button
        className={libraryStatus ? `${classes['library-active']}` : ''}
        onClick={openLibraryHandler}
      >
        Library
        <BsMusicNoteBeamed />
      </button>
    </nav>
  );
};

export default Nav;
