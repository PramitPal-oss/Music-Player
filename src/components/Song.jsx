/** @format */

//import '../styles/app.css';
import classes from './Song.module.css';

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className={classes['song-container']}>
      <img
        className={isPlaying ? `${classes.rotateSong}` : ''}
        src={currentSong.cover}
        alt=''
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
