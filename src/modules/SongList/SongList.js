// @flow
import React, { useEffect } from "react";
import "./song-list.css";
import SongCard from "./ConnectedSongCard";
import { fetchSongs } from "./actions";
import { connect } from "react-redux";

type Song = {
  title: string,
  artist: { name: string },
  audio: string
};
type Props = { fetchSongs: Function, songs: Song[] };

function SongList({ fetchSongs, songs }: Props) {
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="SongList">
      {songs.map(({ audio, title, artist }) => (
        <SongCard key={audio} title={title} audio={audio} artist={artist} />
      ))}
    </div>
  );
}

export { SongList };
export default connect(
  state => ({ songs: state.songs }),
  { fetchSongs }
)(SongList);
