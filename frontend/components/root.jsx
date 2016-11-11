import React from "react";
import { Provider } from "react-redux";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import MainLayout from "./layouts/main_layout";
import Home from "./home/home";
import Modal from "./modal/modal";
import SessionFormContainer from "./session/session_form_container";
import ProfileContainer from "./profile/profile_container";
import EditorContainer from "./editor/editor_container";

const Root = ({store}) => {
  const _ensureLoggedIn = (nextState, replace) => { 
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace("/login");
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace("/");
    }
  }

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={Home}/>

          <Route path="/login" component={Modal} onEnter={_redirectIfLoggedIn}>
            <IndexRoute component={SessionFormContainer} />
           </Route>
          
           <Route path="/signup" component={Modal} onEnter={_redirectIfLoggedIn}>
            <IndexRoute component={SessionFormContainer} />
          </Route>

          <Route path="/users/:userId/profile" component={ProfileContainer} onEnter={_ensureLoggedIn}>
          </Route>

          <Route path="/users/:userId/tracks/:trackId/edit" component={EditorContainer} onEnter={_ensureLoggedIn}>
          </Route>
        </Route> 
        <Route path="/edit" component={EditorContainer}>
        </Route>
      </Router>
    </Provider>
  );
}

export default Root;
