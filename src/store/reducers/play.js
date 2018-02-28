import _ from 'lodash';
import fetch from '../../fetch';
import { createActions, handleActions } from 'redux-actions';

const initState = {
  fullScreen: false,
  list: [],
  index: -1,
  mode: 0,
  ing: false
};
export const { setIng, toggleScreen, setMode, setSong } = createActions(
  {},
  'SET_ING',
  'TOGGLE_SCREEN',
  'SET_MODE',
  'SET_SONG'
);

export default handleActions(
  {
    [setIng](state, { payload: bool }) {
      return _.assign({}, state, { ing: bool });
    },
    [toggleScreen](state) {
      return _.assign({}, state, { fullScreen: !state.fullScreen });
    },
    [setMode](state, { payload: mode }) {
      return _.assign({}, state, { mode });
    },
    [setSong](state, { payload }) {
      let { list, index } = payload;
      return _.assign({}, state, { index, list });
    }
  },
  initState
);




export const selectSong = ({ list, index }) => {
  return async (dispatch, getState) => {
    let state = getState()['play'];
    if (index < -1 || list.length === 0) {
      return;
    }
    let ing = state.ing;
    let song = list[index];
    let playSong = {};
    if (!_.isEmpty(state.list) && state.index >= 0) {
      playSong = state.list[state.index];
    }
    if (!_.isEmpty(playSong)) {
      if (
        song.songmid === playSong.songmid &&
        state.list.length === list.length
      ) {
        if (!ing) {
          dispatch(setIng(true));
        }
        return;
      }
    }

    if (!song.lyric) {
      let response = await fetch('/song', {
        params: {
          mid: song.songmid
        }
      });
      song.url = response.url;
      song.lyric = response.lyric;
    }
    if (list.length === 1 && index === 0) {
      let t, ti;
      let fi = _.findIndex(state.list, (item) => item.songmid === song.songmid);
      if (fi !== -1) {
        t = state.list;
        ti = fi;
      } else {
        let array = [...state.list];
        array.push(song);
        t = array;
        ti = array.length - 1;
      }
      dispatch(
        setSong({
          list: t,
          index: ti
        })
      );
    } else {
      dispatch(
        setSong({
          list: list,
          index
        })
      );
    }
    dispatch(setIng(true));
    if (!ing) {
      dispatch(toggleScreen());
    }
  };
};
