import { connect } from "react-redux";
import { playSong, pause } from "./actions";
import SongCard from "../../Components/SongCard";

const withPlayingState = connect(
    (state, props) => ({
      playing: state.selectedSong === props.audio && state.playing,
      selected: state.selectedSong === props.audio,
    }),
    (dispatch, props) => ({
      setPlaying: playing =>
        playing ? dispatch(playSong(props.audio)) : dispatch(pause())
    })
  );

  export default withPlayingState(SongCard);