import React from "react";
import { Provider } from "react-redux";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import MainLayout from "./layouts/main_layout";
import Home from "./home/home";
import Modal from "./modal/modal";
import SessionFormContainer from "./session/session_form_container";

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
          <IndexRoute component={Home} />
          <Route path="/login" component={Modal} onEnter={_redirectIfLoggedIn}>
            <IndexRoute component={SessionFormContainer} />
           </Route>
        
          <Route path="/signup" component={Modal} onEnter={_redirectIfLoggedIn}>
            <IndexRoute component={SessionFormContainer} />
          </Route>
        </Route> 
      </Router>
    </Provider>
  );
}

export default Root;
