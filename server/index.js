const Koa = require('koa');
const axios = require('axios').default;
const Router = require('koa-router');
const constParams = {
  format: 'json',
  g_tk: 5381,
  hostUin: 0,
  loginUin: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  platform: 'yqq',
  notice: 0,
  needNewCode: 0
};
const app = new Koa();
const router = new Router({
  prefix: '/api'
});

router.get('/musicu', async (ctx) => {
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg`;
  let params = {
    ...constParams,
    data: JSON.stringify({
      comm: {
        ct: 24
      },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: {
          async: 1,
          cmd: 2
        },
        module: 'playlist.HotRecommendServer'
      },
      new_song: {
        module: 'QQMusic.MusichallServer',
        method: 'GetNewSong',
        param: {
          type: 0
        }
      },
      focus: {
        module: 'QQMusic.MusichallServer',
        method: 'GetFocus',
        param: {}
      }
    })
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});
router.get('/singers', async (ctx) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let params = {
    ...constParams,
    channel: `singer`,
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});
router.get('/ranks', async (ctx) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg';
  let params = {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = JSON.parse(
    response.data.slice(
      response.data.indexOf('(') + 1,
      response.data.length - 1
    )
  );
});

router.get('/flgds', async (ctx) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  let params = {
    ...constParams,
    picmid: 1,
    rnd: Math.random(),
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 59
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/rank', async (ctx) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  let id = ctx.query.id;
  let type = ctx.query.type;
  let date = ctx.query.date;
  let params = {
    ...constParams,
    tpl: 3,
    page: 'detail',
    date: date,
    topid: id,
    type: type,
    song_begin: 0,
    song_num: 50
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/flgd', async (ctx) => {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  let id = ctx.query.id;
  let params = {
    ...constParams,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: id
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});


router.get('/album', async (ctx) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/musicmall.fcg';
  let id = ctx.query.id;
  let params = {
    ...constParams,
    cmd:`get_album_buy_page`,
    albumid:id,
    p:Math.random(),
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/singersong', async (ctx) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let mid = ctx.query.mid;
  let params = {
    ...constParams,
    singermid: mid,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/singeralbum', async (ctx) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg';
  let mid = ctx.query.mid;
  let params = {
    ...constParams,
    singermid: mid,
    order: 'time',
    begin: 0,
    num: 50,
    exstatus: 1
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/singermv', async (ctx) => {
  let url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg';
  let mid = ctx.query.mid;
  let params = {
    ...constParams,
    singermid: mid,
    order: 'listen',
    begin: 0,
    num: 52,
    cid: 205360581
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/song', async (ctx) => {
  let vkeyUrl =
    'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  let lyricUrl = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  let mid = ctx.query.mid;
  let guid = Math.random();
  let vkeyParams = {
    ...constParams,
    cid: 205361747,
    uin: 0,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid
  };
  let lyricParams = {
    ...constParams,
    pcachetime: 1517369605326,
    songmid: mid
  };
  let response = await axios.get(vkeyUrl, {
    params: vkeyParams,
    headers: {
      referer: 'y.qq.com'
    }
  });
  let vkey = response.data.data.items[0].vkey;
  let responseLyric = await axios.get(lyricUrl, {
    params: lyricParams,
    headers: {
      referer: 'y.qq.com'
    }
  });
  let url = `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`;
  let lyric = responseLyric.data;
  lyric = JSON.parse(lyric.slice(lyric.indexOf('(') + 1, lyric.length - 1));
  ctx.body = {
    url,
    lyric: {
      main: lyric.lyric,
      tran: lyric.trans
    }
  };
});

router.get('/hotkey', async (ctx) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  let params = {
    ...constParams
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

router.get('/smartBox', async (ctx) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';
  let key = ctx.query.key;
  let params = {
    ...constParams,
    is_xml: 0,
    key
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});


router.get('/search', async (ctx) => {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp';
  let val = ctx.query.val;
  let type = ctx.query.type;
  let params = {
    ...constParams,
    ct:24,
    qqmusic_ver:1298,
    new_json:1,
    remoteplace:'txt.yqq.song',
    searchid:55974968798558748,
    t:type,
    aggr:1,
    cr:1,
    catZhida:1,
    lossless:0,
    flag_qc:0,
    p:1,
    n:100,
    w:val
  };
  let response = await axios.get(url, {
    params,
    headers: {
      referer: 'y.qq.com'
    }
  });
  ctx.body = response.data;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8081);
