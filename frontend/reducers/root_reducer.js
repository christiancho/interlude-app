import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import musicReducer from './music_reducer';
import loadingReducer from './loading_reducer';
import currentTrackReducer from './current_track_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  loading: loadingReducer,
  music: musicReducer,
  currentTrack: currentTrackReducer
});

export default rootReducer;
