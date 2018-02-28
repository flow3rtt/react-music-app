import { combineReducers } from 'redux';
import persist from './persist';
import play from './play';

export default combineReducers({
  persist,
  play
});
