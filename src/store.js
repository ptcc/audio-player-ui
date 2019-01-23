import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./modules/SongList";
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
