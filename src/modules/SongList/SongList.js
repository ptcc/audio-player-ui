// @flow
import React, { useEffect } from "react";
import "./song-list.css";
import SongCard from "./ConnectedSongCard";
import { fetchSongs } from "./actions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import PlayListControl from "./ConnectedPlayListControl";

type Song = {
  title: string,
  artist: { name: string },
  audio: string
};
type Props = { fetchSongs: Function, songs: Song[], loading: boolean };

function SongList({ fetchSongs, songs, loading }: Props) {
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="SongList">
      <PlayListControl />
      {loading && <CircularProgress className="song-list__loading-indicator" />}
      {songs.map(({ audio, title, artist }) => (
        <SongCard key={audio} title={title} audio={audio} artist={artist} />
      ))}
    </div>
  );
}

export { SongList };
export default connect(
  state => ({ songs: state.songs, loading: state.loading }),
  { fetchSongs }
)(SongList);
