import { reducer, initialState } from "./reducer";
import { playSelected, playSong, fetchSongsSuccess, pause } from "./actions";

describe("SongList reducer", () => {
  describe("init", () => {
    it("should return the initial state", () => {
      expect(reducer()).toEqual(initialState);
    });
  });
  describe("play selected", () => {
    it("should set playing to true", () => {
      expect(
        reducer(
          {
            songs: [{ audio: "SONG_KEY" }],
            loading: false,
            playing: false,
            selectedSong: "SONG_KEY"
          },
          playSelected()
        )
      ).toEqual({
        songs: [{ audio: "SONG_KEY" }],
        loading: false,
        playing: true,
        selectedSong: "SONG_KEY"
      });
    });
  });
  describe("play song", () => {
    it("should set playing to true and select the song", () => {
      expect(
        reducer(
          {
            songs: [{ audio: "SONG_KEY1" }, { audio: "SONG_KEY2" }],
            loading: false,
            playing: false,
            selectedSong: "SONG_KEY1"
          },
          playSong("SONG_KEY2")
        )
      ).toEqual({
        songs: [{ audio: "SONG_KEY1" }, { audio: "SONG_KEY2" }],
        loading: false,
        playing: true,
        selectedSong: "SONG_KEY2"
      });
    });
  });
  describe("fetch songs succesfully", () => {
    it("should set the songs array and select the first song", () => {
      expect(
        reducer(
          initialState,
          fetchSongsSuccess([{ audio: "KEY1" }, { audio: "KEY2" }])
        )
      ).toEqual({
        ...initialState,
        songs: [{ audio: "KEY1" }, { audio: "KEY2" }],
        selectedSong: "KEY1"
      });
    });
  });
  describe("Pause", () => {
    it("should set playing to false", () => {
      expect(
        reducer(
          {
            songs: [{ audio: "SONG_KEY" }],
            loading: false,
            playing: true,
            selectedSong: "SONG_KEY"
          },
          pause()
        )
      ).toEqual({
        songs: [{ audio: "SONG_KEY" }],
        loading: false,
        playing: false,
        selectedSong: "SONG_KEY"
      });
    });
  });
});
