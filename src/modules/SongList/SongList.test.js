import React from "react";
import ReactDOM from "react-dom";
import { SongList } from "./SongList";
jest.mock("react-redux", ()=>({ connect: () => Component => Component }));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SongList songs={[]} fetchSongs={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
