import React, { useState, useEffect } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./ViewSearchSongs.scss";

const db = firebase.firestore(firebase);

export default function ViewSearchSongs(props) {
  const { title, data } = props;
  return (
    <div className="view-search-songs">
      <h2>{title}</h2>
      <Grid>
        {map(data, (dataItem) => {
          return (
            <Grid.Column
              key={dataItem.objectID}
              mobile={8}
              tablet={5}
              computer={4}
            >
              <ViewSearchSongItem key={dataItem.objectID} data={dataItem} />
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
}

function ViewSearchSongItem(props) {
  const { data } = props;
  const [bannerUrl, setBannerUrl] = useState(null);
  const [nameArtist, setNameArtist] = useState(null);

  useEffect(() => {
    db.collection("albums")
      .doc(data.album)
      .get()
      .then((response) => {
        const dataUrl = response.data();
        firebase
          .storage()
          .ref(`album/${dataUrl.banner}`)
          .getDownloadURL()
          .then((url) => {
            setBannerUrl(url);
          });

        db.collection("artists")
          .doc(dataUrl.artist)
          .get()
          .then((response) => {
            const dataArt = response.data();
            setNameArtist(dataArt.name);
          });
      });
  }, [data]);

  return (
    <Link to={`/album/${data.album}`}>
      <div className="view-search-songs__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        >
          <Icon name="play circle outline" />
        </div>
        <div className="description">
          <h3>{data.name}</h3>
          <h4>{nameArtist}</h4>
        </div>
      </div>
    </Link>
  );
}
