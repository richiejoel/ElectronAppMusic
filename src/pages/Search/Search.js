import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import ViewSearch from "../../components/Search/ViewSearch";
import ViewSearchAlbums from "../../components/Search/ViewSearchAlbums";
import ViewSearchSongs from "../../components/Search/ViewSearchSongs";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./Search.scss";

const db = firebase.firestore(firebase);
const algoliasearch = require("algoliasearch");

function Search(props) {
  const { playerSong } = props;
  const [arraySearch, setArraySearch] = useState([]);
  const [isArtists, setIsArtists] = useState(false);
  const [isAlbums, setIsAlbums] = useState(false);
  const [isSongs, setIsSongs] = useState(false);
  const [arraySearchItem, setArraySearchItem] = useState([]);
  const [arraySearchArtists, setArraySearchArtists] = useState([]);
  const [arraySearchAlbums, setArraySearchAlbums] = useState([]);
  const [arraySearchSongs, setArraySearchSongs] = useState([]);
  const arrayAll = [];
  const arrayArtists = [];
  const arrayAlbums = [];
  const arraySongs = [];
  //console.log(props.match.params.findString);

  const client = algoliasearch(
    "3PHHH4LLYL",
    "bde229e1fb94ac502d9b7b3e0c2bcf68"
  );
  const index = client.initIndex("search");

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        map(response?.docs, (artist) => {
          const dataArt = artist.data();
          dataArt.objectID = artist.id;
          dataArt.type = "artists";
          arrayArtists.push(dataArt);
          arrayAll.push(dataArt);
          //setIsArtists(true);
        });
      })
      .catch(() => {})
      .finally(() => {});

    db.collection("albums")
      .get()
      .then((response) => {
        map(response?.docs, (album) => {
          const dataAlb = album.data();
          dataAlb.objectID = album.id;
          dataAlb.type = "albums";
          arrayAlbums.push(dataAlb);
          arrayAll.push(dataAlb);
        });
      })
      .catch(() => {})
      .finally(() => {});

    db.collection("songs")
      .get()
      .then((response) => {
        map(response?.docs, (song) => {
          const dataSng = song.data();
          dataSng.objectID = song.id;
          dataSng.type = "songs";
          arraySongs.push(dataSng);
          arrayAll.push(dataSng);
          //setIsSongs(true);
        });
      })
      .catch(() => {})
      .finally(() => {});

    setArraySearch(arrayAll);
  }, [props.match.params.findString]);

  useEffect(() => {
    index
      .search(props.match.params.findString)
      .then(({ hits }) => {
        console.log(hits);
        let isAlbm = false;
        let isArts = false;
        let isSgn = false;
        const arraySearchTempArts = [];
        const arraySearchTempAlbm = [];
        const arraySearchTempSgn = [];
        hits.forEach((hit) => {
          if (hit.type === "artists") {
            isArts = true;
            arraySearchTempArts.push(hit);
          } else if (hit.type === "albums") {
            isAlbm = true;
            arraySearchTempAlbm.push(hit);
          } else if (hit.type === "songs") {
            isSgn = true;
            arraySearchTempSgn.push(hit);
          }
        });
        //setArraySearchItem(arraySearchTemp);
        setArraySearchArtists(arraySearchTempArts);
        setArraySearchAlbums(arraySearchTempAlbm);
        setArraySearchSongs(arraySearchTempSgn);
        if (isArts) {
          setIsArtists(true);
        } else {
          setIsArtists(false);
        }
        if (isAlbm) {
          setIsAlbums(true);
        } else {
          setIsAlbums(false);
        }
        if (isSgn) {
          setIsSongs(true);
        } else {
          setIsSongs(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.findString]);

  if (arraySearch !== null) {
    index
      .saveObjects(arraySearch)
      .then((objectIDs) => {
        console.log(objectIDs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!props.match.params.findString) {
    return null;
  }

  return (
    <div className="search">
      {isArtists === true ? (
        <ViewSearch title="Artists" data={arraySearchArtists} />
      ) : null}
      {isAlbums === true ? (
        <ViewSearchAlbums title="Albums" data={arraySearchAlbums} />
      ) : null}
      {isSongs === true ? (
        <ViewSearchSongs
          title="Songs"
          data={arraySearchSongs}
          playerSong={playerSong}
        />
      ) : null}
    </div>
  );
}

export default withRouter(Search);
