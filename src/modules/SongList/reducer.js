// @flow
import {
  FETCH_SONGS,
  FETCH_SONGS_FAILED,
  FETCH_SONGS_SUCCESS,
  PLAY_SELECTED,
  PLAY_SONG,
  PAUSE,
  NOOP,
  SELECT_SONG,
  NEXT,
  PREVIOUS,
  type SongAction
} from "./actions";

type State = {
  songs: Object[],
  loading: boolean,
  playing: boolean,
  selectedSong: ?string
};

const initialState = {
  songs: [],
  loading: false,
  playing: false,
  selectedSong: null
};

const handlers = {
  [FETCH_SONGS]: (state: State, action: SongAction) => ({
    ...state,
    loading: true
  }),
  [FETCH_SONGS_SUCCESS]: (state: State, action: SongAction) => ({
    ...state,
    loading: false,
    songs: action.payload,
    selectedSong:
      action.payload && action.payload.length > 0 && action.payload[0].audio
  }),
  [FETCH_SONGS_FAILED]: (state: State, action: SongAction) => ({
    ...state,
    loading: false
  }),
  [SELECT_SONG]: (state: State, action: SongAction) => ({
    ...state,
    selectedSong: action.payload
  }),
  [PLAY_SONG]: (state: State, action: SongAction) => ({
    ...state,
    selectedSong: action.payload,
    playing: true
  }),
  [PLAY_SELECTED]: (state: State, action: SongAction) => ({
    ...state,
    playing: true
  }),
  [NEXT]: (state: State, action: SongAction) => {
    const currentSongIndex = state.songs.findIndex(song=>song.audio===state.selectedSong);
    const nextSong = state.songs[(currentSongIndex + 1) % state.songs.length ];
    return {
      ...state,
      selectedSong: nextSong.audio      
    };
  },
  [PREVIOUS]: (state: State, action: SongAction) => {
    const currentSongIndex = state.songs.findIndex(song=>song.audio===state.selectedSong);
    const nextSong = state.songs[(currentSongIndex - 1 + state.songs.length) % state.songs.length ];
    return {
      ...state,
      selectedSong: nextSong.audio      
    };
  },
  [PAUSE]: (state: State, action: SongAction) => ({ ...state, playing: false })
};

function reducer(
  state: State = initialState,
  action: SongAction = { type: NOOP }
) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

export { reducer, initialState };
