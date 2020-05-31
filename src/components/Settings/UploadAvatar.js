import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/storage";
import "firebase/auth";

import NoAvatar from "../../assets/png/user.png";

export default function UploadAvatar(props) {
  const { user, setReloadApp } = props;
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFiles) => {
    //console.log(acceptedFiles);
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file).then(() => {
      updateUserAvatar();
    });
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (file) => {
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (response) => {
        await firebase.auth().currentUser.updateProfile({ photoURL: response });
        setReloadApp((prevState) => !prevState);
        //console.log(response);
      })
      .catch(() => {
        toast.error("Error al actualizar el avatar.");
      });
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
