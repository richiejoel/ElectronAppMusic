import React, { useState, useEffect } from "react";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import ReactPlayer from "react-player";

import "./Player.scss";

/*const songData = {
  image:
    "https://firebasestorage.googleapis.com/v0/b/musicfy-5f41a.appspot.com/o/album%2F7dd8ff95-a72d-4f8f-8ab5-25bb99bc78f0?alt=media&token=e76a1c80-021f-4875-9d66-5b8f92ba2547",
  name: "Adore you",
  url: "",
};*/

//useLayoutEffect -> tener en cuenta hook

export default function Player(props) {
  const { songData } = props;
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [randomSong, setRandomSong] = useState(false);

  console.log(!songData ? false : songData.state);

  const onStart = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onRepeat = () => {
    if (!repeat) {
      setRepeat(true);
    } else {
      setRepeat(false);
    }
  };

  const onRandomSong = () => {
    if (!randomSong) {
      setRandomSong(true);
    } else {
      setRandomSong(false);
    }
  };

  const onProgress = (data) => {
    setPlayedSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  useEffect(() => {
    if (songData?.url) {
      //onStart();
      console.log("nana monita");
    }
  }, [songData]);

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <div className="controls">
            <Icon
              onClick={onRandomSong}
              className="icons-aditionals"
              id={randomSong && "random-icon"}
              name="random"
            />
            <Icon className="icons-aditionals" name="step backward" />
            {playing ? (
              <Icon
                onClick={onPause}
                className="icons-play"
                name="pause circle outline"
              />
            ) : (
              <Icon
                onClick={onStart}
                className="icons-play"
                name="play circle outline"
              />
            )}
            <Icon className="icons-aditionals" name="step forward" />
            <Icon
              onClick={onRepeat}
              className="icons-aditionals"
              id={repeat && "loop-icon"}
              name="retweet"
            />
          </div>
          <Progress
            progress="value"
            value={playedSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Grid.Column>
        <Grid.Column width={4} className="right">
          <Input
            label={<Icon name="volume up" />}
            min={0}
            max={1}
            step={0.01}
            type="range"
            name="volume"
            onChange={(e, data) => {
              setVolume(Number(data.value));
            }}
            value={volume}
          />
        </Grid.Column>
      </Grid>
      <ReactPlayer
        className="react-player"
        url={songData?.url}
        playing={playing}
        loop={repeat}
        height="0"
        width="0"
        volume={volume}
        onProgress={(e) => onProgress(e)}
      />
    </div>
  );
}
