import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./Albums.scss";

const db = firebase.firestore(firebase);

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    db.collection("albums")
      .get()
      .then((response) => {
        const arrayAlbums = [];
        map(response?.docs, (album) => {
          const data = album.data();
          data.id = album.id;
          arrayAlbums.push(data);
        });
        setAlbums(arrayAlbums);
        console.log(arrayAlbums);
      });
  }, []);

  return (
    <div className="albums">
      <h1>Álbumes</h1>
      <Grid>
        {map(albums, (album) => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <Album key={album.id} album={album} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}

function Album(props) {
  const { album } = props;
  const [bannerUrl, setBannerUrl] = useState(null);

  //console.log(artist);
  //console.log(bannerUrl);

  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [album]);

  return (
    <Link to={`/album/${album.id}`}>
      <div className="albums__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
}
