import React from "react";
import ReactDOM from "react-dom";
import { SongList } from "./SongList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SongList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
