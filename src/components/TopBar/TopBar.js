import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import UserImage from "../../assets/png/user.png";
import ModalConfirmation from "../Modal/ModalConfirmation";

import "./TopBar.scss";

function TopBar(props) {
  const { user, history } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const logOut = () => {
    console.log("Cerrar sesión");
    firebase.auth().signOut();
  };

  const goBack = () => {
    history.goBack();
  };

  const handlerModel = (type) => {
    switch (type) {
      case "logout":
        setTitleModal("Alerta!");
        setContentModal(<h2>¿Está seguro de cerrar sesión?</h2>);
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">
          <Icon name="angle left" onClick={goBack} />
        </div>
        <div className="top-bar__right">
          <Link to="/settings">
            <Image src={user.photoURL ? user.photoURL : UserImage} />
            {user.displayName}
          </Link>
          <Icon name="power off" onClick={() => handlerModel("logout")} />
        </div>
      </div>
      <ModalConfirmation
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        logOut={logOut}
      >
        {contentModal}
      </ModalConfirmation>
    </>
  );
}

export default withRouter(TopBar);
