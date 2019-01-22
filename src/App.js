// @flow
import React, { Component } from "react";
import axios from "axios";
import * as R from "ramda";
import "./App.css";
import SongCard from "./SongCard";

const getData = R.prop("data");
const getSong = song => axios.get(song).then(getData);

type Song = {
  title: string,
  artist: { name: string },
  audio: string,
};
type State = { songs: Song[] };
type Props = { apiAddress: string };

class App extends Component<Props, State> {
  state = {
    songs: []
  };

  componentDidMount() {
    const { apiAddress } = this.props;
    axios
      .get(`${apiAddress}/songs`)
      .then(getData)
      .then(songUrls => Promise.all(songUrls.map(getSong)))
      .then(songs => this.setState({ songs }));
  }

  render() {
    const { songs } = this.state;
    return (
      <div className="App">
        {songs.map(({ audio, title, artist }) => (
          <SongCard key={audio} title={title} stream={audio} artist={artist} />
        ))}
      </div>
    );
  }
}

export default App;
