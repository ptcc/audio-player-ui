import React from "react";
import ReactDOM from "react-dom";
import SongCard from "./SongCard";
import { render, fireEvent, cleanup } from "react-testing-library";
describe("SongCard", () => {
  // mock HTMLMediaElement
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });
  afterEach(cleanup);
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <SongCard
        title="title"
        artist={{ name: "artist" }}
        audio="test"
        playing={false}
        setPlaying={() => {}}
        selected={false}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("calls setPlaying when button is clicked", () => {
    const setPlaying = jest.fn();
    const { getByTestId } = render(
      <SongCard
        title="title"
        artist={{ name: "artist" }}
        audio="test"
        playing={false}
        setPlaying={setPlaying}
        selected={false}
      />
    );
    const button = getByTestId("Play/pause");
    fireEvent.click(button);
    expect(setPlaying).toHaveBeenCalledWith(true);
  });
});
