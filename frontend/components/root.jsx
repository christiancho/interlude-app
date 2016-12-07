import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { clearErrors } from '../actions/session_actions';
import Splash from './splash';
import AuthBegin from './auth_form/auth_begin';
import LoginFormContainer from './auth_form/login_form_container';
import SignupFormContainer from './auth_form/signup_form_container';
import App from './main_app/app';
import BrowseContainer from './main_app/browse_container';
import ArtistContainer from './music_elements/artist_container';

const Root = ({ store }) => {

  const _redirect = (nextState, replace) => {
    if ( !!store.getState().session.currentUser ) {
      replace("/browse");
    } else {
      replace("/welcome");
    }
  }

  const _onSessionEnter = (nextState, replace) => {
    if ( !!store.getState().session.currentUser ) {
      replace("/browse");
    }
    store.dispatch(clearErrors());
  }

  const _requireLogin = (nextState, replace) => {
    if ( !store.getState().session.currentUser ) {
      replace("/welcome");
    }
  }

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>

        <Route path="/" >
          <IndexRoute onEnter={ _redirect } />

          <Route component={ App } onEnter={ _requireLogin }>
            <Route path="/search" component={ BrowseContainer } />
            <Route path="/browse" component={ BrowseContainer } />
            <Route path="/your-music" component={ BrowseContainer } />
            <Route path="/radio" component={ BrowseContainer } />
            <Route path="/social" component={ BrowseContainer } />
            <Route path="/artists/:artistId" component={ ArtistContainer } />
          </Route>

          <Route path="/welcome" component={ Splash } onEnter={ _onSessionEnter }>
            <IndexRoute component={ AuthBegin } />
            <Route path="/login"
              component={ LoginFormContainer }
              onEnter={ _onSessionEnter }
            />
            <Route path="/signup"
              component={ SignupFormContainer }
              onEnter={ _onSessionEnter }
            />
          </Route>


        </Route>

      </Router>
    </Provider>
  );

};

export default Root;
