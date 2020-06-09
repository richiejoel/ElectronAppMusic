import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./ViewSearchAlbums.scss";

const db = firebase.firestore(firebase);

export default function ViewSearchAlbums(props) {
  const { title, data } = props;
  return (
    <div className="view-search-albums">
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
              <ViewSearchAlbumItem key={dataItem.objectID} data={dataItem} />
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
}

function ViewSearchAlbumItem(props) {
  const { data } = props;
  const [bannerUrl, setBannerUrl] = useState(null);
  const [nameArtist, setNameArtist] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${data.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [data]);

  useEffect(() => {
    db.collection("artists")
      .doc(data.artist)
      .get()
      .then((response) => {
        const dataArt = response.data();
        setNameArtist(dataArt.name);
      });
  }, [data]);

  return (
    <Link to={`/album/${data.objectID}`}>
      <div className="view-search-albums__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <div className="description">
          <h3>{data.name}</h3>
          <h4>{nameArtist}</h4>
        </div>
      </div>
    </Link>
  );
}
