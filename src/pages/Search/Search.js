import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./Search.scss";

const db = firebase.firestore(firebase);
const algoliasearch = require("algoliasearch");

function Search(props) {
  const [arraySearch, setArraySearch] = useState([]);
  const [isArtists, setIsArtists] = useState(false);
  const [isAlbums, setIsAlbums] = useState(false);
  const [isSongs, setIsSongs] = useState(false);
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
        hits.forEach((hit) => {
          if (hit.type === "artists") {
            isArts = true;
          } else if (hit.type === "albums") {
            isAlbm = true;
          } else if (hit.type === "songs") {
            isSgn = true;
          }
        });
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
    <div>
      {isArtists === true ? <h2>Artists</h2> : null}
      {isAlbums === true ? <h2>Albums</h2> : null}
      {isSongs === true ? <h2>Songs</h2> : null}
    </div>
  );
}

export default withRouter(Search);
