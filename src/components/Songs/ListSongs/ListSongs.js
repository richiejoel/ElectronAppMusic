import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./ListSongs.scss";

export default function ListSongs(props) {
  const { songsAlbum, albumImg, playerSong } = props;
  //console.log(songsAlbum);

  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(songsAlbum, (song) => {
          return (
            <Song
              key={song.id}
              song={song}
              playerSong={playerSong}
              albumImg={albumImg}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
}

function Song(props) {
  const { song, albumImg, playerSong } = props;

  const onPlay = () => {
    playerSong(albumImg, song.name, song.fileName);
  };

  return (
    <Table.Row onClick={onPlay}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
}
