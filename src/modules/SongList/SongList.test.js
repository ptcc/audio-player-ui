import React from "react";
import ReactDOM from "react-dom";
import { SongList } from "./SongList";
jest.mock("./ConnectedPlayListControl");

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SongList songs={[]} fetchSongs={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
