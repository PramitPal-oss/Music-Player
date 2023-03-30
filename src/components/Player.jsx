/** @format */
import React, { useState } from 'react';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go';
import { AiOutlinePause } from 'react-icons/ai';
import { playAudio } from '../util';
import { BsFillVolumeUpFill } from 'react-icons/bs';
//import '../styles/app.css';
import classes from './Player.module.css';

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const [activeVolume, setActiveVolume] = useState(false);

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  //Event Handlers
  function getTime(time) {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    //Forward BAck
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    <div className={classes.player}>
      <div className={classes['time-control']}>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className={classes.track}
        >
          <input
            value={songInfo.currentTime}
            type='range'
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className={classes['animate-track']}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className={classes['play-control']}>
        <button className={classes.btn}>
          <GoTriangleLeft
            className={classes['skip-back']}
            onClick={() => skipTrackHandler('skip-back')}
          />
        </button>
        <button className={`${classes.btn} ${classes.play}`}>
          {isPlaying ? (
            <AiOutlinePause onClick={playSongHandler} />
          ) : (
            <TbPlayerPlayFilled onClick={playSongHandler} />
          )}
        </button>
        <button className={classes.btn}>
          <GoTriangleRight
            className={classes['skip-forward']}
            onClick={() => skipTrackHandler('skip-forward')}
          />
        </button>
        <div className={classes.volume}>
          <BsFillVolumeUpFill onClick={() => setActiveVolume(!activeVolume)} />

          <input
            onChange={changeVolume}
            value={songInfo.volume}
            max='1'
            min='0'
            step='0.01'
            type='range'
          />
        </div>
      </div>
    </div>
  );
};

export default Player;

/*  {activeVolume && (
            <input
              onChange={changeVolume}
              value={songInfo.volume}
              max='1'
              min='0'
              step='0.01'
              type='range'
            />
          )} */
