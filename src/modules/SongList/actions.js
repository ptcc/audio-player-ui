import * as R from "ramda";
import axios from "axios";

const FETCH_SONGS = "FETCH_SONGS";
const FETCH_SONGS_SUCCESS = "FETCH_SONGS_SUCCESS";
const FETCH_SONGS_FAILED = "FETCH_SONGS_FAILED";
const SELECT_SONG = "SELECT_SONG";
const PLAY_SONG = "PLAY_SONG";
const PLAY_SELECTED = "PLAY_SELECTED";
const PAUSE = "PAUSE";
const PREVIOUS = "PREVIOUS";
const NEXT = "NEXT";
const NOOP = "NOOP";

type FetchSongsAction = {| type: "FETCH_SONGS" |};
type FetchSongsActionCreator = void => FetchSongsAction;
type FetchSongsSuccessAction = {|
  type: "FETCH_SONGS_SUCCESS",
  payload: Object[]
|};
type FetchSongsSuccessActionCreator = (Object[]) => FetchSongsSuccessAction;
type FetchSongsFailedAction = {| type: "FETCH_SONGS_FAILED" |};
type FetchSongsFailedActionCreator = void => FetchSongsFailedAction;
type SelectSongAction = {| type: "SELECT_SONG", payload: string |};
type SelectSongActionCreator = string => SelectSongAction;
type PlaySongAction = {| type: "PLAY_SONG", payload: string |};
type PlaySongActionCreator = string => PlaySongAction;
type PlaySelectedAction = {| type: "PLAY_SELECTED" |};
type PlaySelectedActionCreator = void => PlaySelectedAction;
type PauseAction = {| type: "PAUSE" |};
type PauseActionCreator = void => PauseAction;
type PreviousAction = {| type: "PREVIOUS" |};
type PreviousActionCreator = void => PreviousAction;
type NextAction = {| type: "NEXT" |};
type NextActionCreator = void => NextAction;

type SongAction =
  | FetchSongsAction
  | FetchSongsSuccessAction
  | FetchSongsFailedAction
  | SelectSongAction
  | PlaySongAction
  | PlaySelectedAction
  | PauseAction
  | PreviousAction
  | NextAction
  | { type: "NOOP" };

const getData = R.prop("data");
const getSong = song => axios.get(song).then(getData);

const fetchSongs: FetchSongsActionCreator = () => dispatch => {
  dispatch({ type: FETCH_SONGS });
  axios
    .get(`${process.env.REACT_APP_API_ADDRESS}/songs`)
    .then(getData)
    .then(songUrls => Promise.all(songUrls.map(getSong)))
    .then(songs => dispatch(fetchSongsSuccess(songs)))
    .catch(err => {
      console.error(err);
      dispatch(fetchSongsFailed());
    });
};

const fetchSongsSuccess: FetchSongsSuccessActionCreator = songs => ({
  type: FETCH_SONGS_SUCCESS,
  payload: songs
});
const fetchSongsFailed: FetchSongsFailedActionCreator = () => ({
  type: FETCH_SONGS_FAILED
});
const selectSong: SelectSongActionCreator = songAudio => ({
  type: SELECT_SONG,
  payload: songAudio
});
const playSong: PlaySongActionCreator = songAudio => ({
  type: PLAY_SONG,
  payload: songAudio
});
const playSelected: PlaySelectedActionCreator = () => ({ type: PLAY_SELECTED });
const pause: PauseActionCreator = () => ({ type: PAUSE });
const previous: PreviousActionCreator = () => ({ type: PREVIOUS });
const next: NextActionCreator = () => ({ type: NEXT });

export {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailed,
  selectSong,
  playSong,
  playSelected,
  pause,
  previous,
  next,
  FETCH_SONGS,
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_FAILED,
  SELECT_SONG,
  PLAY_SONG,
  PLAY_SELECTED,
  PAUSE,
  PREVIOUS,
  NEXT,
  NOOP
};

export type { SongAction };
