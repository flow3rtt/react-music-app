import _ from 'lodash';
import fetch from '../../fetch';
import { createActions, handleActions } from 'redux-actions';

const initState = {
  musicu: {},
  singers: [],
  singerMap: {},
  ranks: {},
  rankMap: {},
  flgds: [],
  flgdMap: {},
  albumMap: {}
};

export const {
  setMusicu,
  setSingers,
  setRanks,
  setFlgds,
  setRankMap,
  setFlgdMap,
  setAlbumMap,
  setSingerMap
} = createActions(
  {},
  'SET_MUSICU',
  'SET_SINGERS',
  'SET_RANKS',
  'SET_FLGDS',
  'SET_RANK_MAP',
  'SET_FLGD_MAP',
  'SET_ALBUM_MAP',
  'SET_SINGER_MAP'
);

export default handleActions(
  {
    [setMusicu](state, { payload }) {
      let musicu = {};
      _.forEach(payload, ({ value, key }) => {
        musicu[key] = value;
      });
      return _.assign({}, state, { musicu });
    },
    [setSingers](state, { payload }) {
      return _.assign({}, state, { singers: payload });
    },
    [setRanks](state, { payload }) {
      return _.assign({}, state, { ranks: payload });
    },
    [setFlgds](state, { payload }) {
      return _.assign({}, state, { flgds: payload });
    },
    [setRankMap](state, { payload }) {
      let { rankMap } = state;
      rankMap[payload.key] = payload.value;
      return _.assign({}, state, { rankMap });
    },
    [setFlgdMap](state, { payload }) {
      let { flgdMap } = state;
      flgdMap[payload.key] = payload.value;
      return _.assign({}, state, { flgdMap });
    },
    [setAlbumMap](state, { payload }) {
      let { albumMap } = state;
      albumMap[payload.key] = payload.value;
      return _.assign({}, state, { albumMap });
    },
    [setSingerMap](state, { payload }) {
      let {type, mid, value} = payload;
      let { singerMap } = state;
      if (!singerMap[mid]) {
        singerMap[mid] = {
          [type]: value
        };
        return _.assign({}, state, { singerMap });
      } else {
        singerMap[mid] = _.assign({}, singerMap[mid], {
          [type]: value
        });
        return _.assign({}, state, { singerMap });
      }
    }
  },
  initState
);

export const getMusicuAsync = () => {
  return async (dispatch) => {
    const response = await fetch.get('/musicu');
    if (response.code === 0) {
      const payload = [];
      const swipe = response.focus.data.content;
      const wntjgd = response.recomPlaylist.data.v_hot;
      const xgsf = response.new_song.data.song_list;
      payload.push({
        key: 'swipe',
        value: swipe
      });
      payload.push({
        key: 'wntjgd',
        value: wntjgd
      });
      payload.push({
        key: 'xgsf',
        value: xgsf
      });
      dispatch(setMusicu(payload));
    }
  };
};

export const getSingersAsync = () => {
  return async (dispatch) => {
    const response = await fetch.get('/singers');
    if (response.code === 0) {
      const payload = [];
      const t = {};
      const list = response.data.list;
      _.forEach(list, (item) => {
        if (!t[item.Findex]) {
          t[item.Findex] = {
            title: item.Findex,
            items: []
          };
        } else {
          t[item.Findex].items.push(item);
        }
      });
      _.forEach(t, (item) => {
        if (!_.isEmpty(item.items)) {
          payload.push(item);
        }
      });
      payload.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      payload.unshift({
        title: '热',
        items: _.slice(list, 0, 10)
      });
      dispatch(setSingers(payload));
    }
  };
};

export const getRanksAsync = () => {
  return async (dispatch) => {
    const response = await fetch.get('/ranks');
    const payload = response;
    dispatch(setRanks(payload));
  };
};

export const getFlgdsAsync = () => {
  return async (dispatch) => {
    const response = await fetch.get('/flgds');
    if (response.code === 0) {
      const payload = response.data.list;
      dispatch(setFlgds(payload));
    }
  };
};

export const getRankMapAsync = ({ id, type, date, ...rest }) => {
  return async (dispatch) => {
    let index = date.indexOf('_');
    if (type === 'top' && index !== -1) {
      date = date.substring(0, index + 1) + '0' + date[index + 1];
    }
    const response = await fetch.get(`rank`, {
      params: {
        id,
        type,
        date
      }
    });
    if (response.code === 0) {
      const value = _.assign({}, rest, response);
      dispatch(
        setRankMap({
          key: id,
          value
        })
      );
    }
  };
};

export const getFlgdMapAsync = (id) => {
  return async (dispatch) => {
    const response = await fetch.get(`/flgd`, {
      params: {
        id
      }
    });
    if (response.code === 0) {
      const value = response.cdlist[0];
      dispatch(
        setFlgdMap({
          key: id,
          value
        })
      );
    }
  };
};

export const getAlbumMapAsync = (id) => {
  return async (dispatch) => {
    const response = await fetch.get(`/album`, {
      params: {
        id
      }
    });
    if (response.code === 0) {
      const value = response.data;
      dispatch(
        setAlbumMap({
          key: id,
          value
        })
      );
    }
  };
};


export const getSingerMapAsync = ({ mid, type }) => {
  return async (dispatch) => {
    const response = await fetch.get(`/singer${type}`, {
      params: {
        mid
      }
    });
    if (response.code === 0) {
      const value = response.data;
      dispatch(
        setSingerMap({
          value,
          mid,
          type
        })
      );
    }
  };
};
