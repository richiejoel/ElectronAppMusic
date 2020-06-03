import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";
import Player from "../../components/Player";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
  const { user, setReloadApp } = props;
  //console.log(user);
  const [songData, setSongData] = useState(null);

  const playerSong = (albumImage, songName, songNameFile) => {
    console.log("albumImage > " + albumImage);
    console.log("songName > " + songName);
    console.log("songNameFile > " + songNameFile);

    firebase
      .storage()
      .ref(`song/${songNameFile}`)
      .getDownloadURL()
      .then((urlSong) => {
        setSongData({
          url: urlSong,
          image: albumImage,
          name: songName,
        });
      });

    /*setSongData({
      url: songUrl,
      name: songName,
      image: albumImage,
    });*/
  };

  /* const image1 =
    "https://firebasestorage.googleapis.com/v0/b/musicfy-5f41a.appspot.com/o/album%2F7dd8ff95-a72d-4f8f-8ab5-25bb99bc78f0?alt=media&token=e76a1c80-021f-4875-9d66-5b8f92ba2547";
  const name1 = "Adore you";
  const url1 =
    "https://firebasestorage.googleapis.com/v0/b/musicfy-5f41a.appspot.com/o/song%2FHarryStyles-AdoreYou.mp3?alt=media&token=1f7300bb-1de6-46fb-89a1-22ffbe054719";
*/
  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            {/*<Button
              style={{ display: "none" }}
              onClick={() => {
                playerSong(image1, name1, url1);
              }}
            >
              START
            </Button>*/}
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routes
              user={user}
              setReloadApp={setReloadApp}
              playerSong={playerSong}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player songData={songData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
