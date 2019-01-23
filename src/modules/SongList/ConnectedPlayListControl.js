import { connect } from "react-redux";
import { playSelected, pause, next, previous } from "./actions";
import PlayListControl from "../../Components/PlayListControl";

const withPlayingState = connect(
  (state, props) => {
    const currentSong = state.songs.find(
      song => song.audio === state.selectedSong
    );
    return {
      playing: state.playing,
      title: currentSong && currentSong.title,
      artist: currentSong && currentSong.artist,
      songCount: state.songs.length,
    };
  },
  (dispatch, props) => ({
    setPlaying: playing =>
      playing ? dispatch(playSelected()) : dispatch(pause()),
    next: () => dispatch(next()),
    previous: () => dispatch(previous())
  })
);

export default withPlayingState(PlayListControl);
