import React from "react"
import ReactDOM from "react-dom"
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    const preloadedState = {session: {currentUser: window.currentUser}};
    store = configureStore(preloadedState); 
  }
  else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, document.getElementById("root"));

  // For testing
  window.store = store;
});

import { createTrack, updateTrack, deleteTrack } from "./actions/track_actions";

window.createTrack = createTrack;
window.updateTrack = updateTrack;
window.deleteTrack = deleteTrack;
