import React, { useState, useEffect } from "react";
import { Form, Button, Input, Icon, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./AddSongForm.scss";

const db = firebase.firestore(firebase);

const countryOptions = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
  { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
  { key: "as", value: "as", flag: "as", text: "American Samoa" },
  { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
  { key: "ao", value: "ao", flag: "ao", text: "Angola" },
  { key: "ai", value: "ai", flag: "ai", text: "Anguilla" },
];

export default function AddSongForm(props) {
  const { setShowModal } = props;
  const [albums, setAlbums] = useState([]);
  const [tinyBanner, setTinyBanner] = useState(null);
  //console.log(tinyBanner);

  let imgAlbum = (album) => {
    let a;
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        a = url;
        setTinyBanner(a);
        console.log(a);
      });

    return a;
  };

  useEffect(() => {
    db.collection("albums")
      .get()
      .then((response) => {
        const albumsArray = [];
        map(response?.docs, (album) => {
          const data = album.data();
          firebase
            .storage()
            .ref(`album/${data.banner}`)
            .getDownloadURL()
            .then((url) => {
              //console.log(url);
              albumsArray.push({
                key: album.id,
                value: album.id,
                text: data.name,
                image: {
                  avatar: true,
                  src: url,
                },
              });
            })
            .catch(() => {});
        });
        setAlbums(albumsArray);
      });
  }, []);

  const onSubmit = () => {
    console.log("Submit...");
  };

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input placeholder="Nombre de la canción" />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Asigna canción a un album"
          search
          selection
          lazyLoad
          options={albums}
        />
      </Form.Field>
      <Form.Field>
        <h2>Upload Image</h2>
      </Form.Field>
      <Button type="submit">Subir canción</Button>
    </Form>
  );
}
