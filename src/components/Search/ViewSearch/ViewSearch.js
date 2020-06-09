import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

import "./ViewSearch.scss";

export default function ViewSearch(props) {
  const { title, data } = props;
  //console.log(title);
  //console.log(data);

  return (
    <div className="view-search">
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
              <ViewSearchItem key={dataItem.objectID} data={dataItem} />
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
}

function ViewSearchItem(props) {
  const { data } = props;
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`artist/${data.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [data]);

  return (
    <Link to={`/artist/${data.objectID}`}>
      <div className="view-search__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <h3>{data.name}</h3>
      </div>
    </Link>
  );
}
