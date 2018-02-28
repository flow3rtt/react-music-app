import React from 'react';
import styled from 'styled-components';
import { full, hiddenFont } from '../assets/style/const';
import * as vars from '../assets/style/var';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import Songs from './songs';
import history from '../history';
import fetch from '../fetch';
import _ from 'lodash';
import { Tabs } from 'antd-mobile';

const tabs = [
  { title: '歌曲', key: 'song' },
  { title: '专辑', key: 'album' },
  { title: 'MV', key: 'mv' }
];

const typeEnum = {
  SONG: {
    key: 'song',
    value: 0
  },
  MV: {
    key: 'mv',
    value: 12
  },
  ALBUM: {
    key: 'album',
    value: 8
  }
};

const Wrapper = styled.div`
  position: fixed !important;
  ${full};
  background-color: ${vars.backgroundColor};
  bottom: 5rem !important;
  position: relative;
`;

const TitleWrapper = styled.div`
  z-index: 2;
  height: 3rem;
  background-color: ${vars.themeColor};
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  color: ${vars.fontColor};
  i {
    font-size: 1.8rem;
  }
  span {
    font-size: 1.2rem;
  }
  > div:nth-child(2) {
    flex: 1;
    padding: 0 0.6rem;
    > input {
      width: 100%;
      color: ${vars.fontColor};
      border: none;
      background-color: ${vars.themeColor};
      outline: none;
      font-size: 1.2rem;
      &::placeholder {
        // color: ${vars.fontColor};
      }
    }
  }
`;

const HotkeyWrapper = styled.div`
  > div:first-child {
    margin: 1rem;
    > span {
      color: ${vars.fontColorTwo};
    }
  }
  > div:last-child {
    margin: 0 1rem;
    > span {
      font-size: 1rem;
      float: left;
      margin: 0.2rem;
      line-height: 1.2;
      padding: 0.2rem 1rem;
      border: 1px solid ${vars.fontColorTwo};
      border-radius: 1rem;
      color: ${'black'};
    }
  }
`;

const SmartBoxWrapper = styled.div`
  > div:first-child {
    margin: 1rem;
    > span {
      color: ${vars.themeColor};
    }
  }
  > div:last-child {
    > div {
      display: flex;
      align-items: center;
      > div:first-child {
        padding: 0.6rem 0.8rem;
        > i {
          font-size: 1.4rem;
          color: ${vars.fontColorTwo};
        }
      }
      > div:last-child {
        flex: 1;
        padding: 0.6rem 0;
        border-bottom: ${vars.border};
      }
    }
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  ${full};
  top: 3rem;
`;

const SongWrapper = styled.div``;

const ZjppWrapper = styled.div`
  margin: 0.6rem 1rem;
  > div:first-child {
    margin-bottom: 0.6rem;
    > span {
      color: ${vars.fontColorTwo};
      font-size: 1rem;
    }
  }
`;
const ZjppSingerWrapper = styled.div`
  display: flex;
  align-items: center;
  > div:first-child {
    width: 50px;
    height: 50px;
    margin-right: 0.6rem;
    > img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  > div:last-child {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:first-child {
      display: flex;
      flex-direction: column;
      > span:first-child {
        font-size: 1.2rem;
        font-weight: 540;
      }
      > span:last-child {
        padding-top: 0.4rem;
        font-size: 1rem;
        color: ${vars.fontColorTwo};
      }
    }
    > div:last-child {
      > i {
        font-size: 1.6rem;
        color: ${vars.fontColorTwo};
      }
    }
  }
`;
const ZjppAlbumWrapper = styled.div`
  display: flex;
  align-items: center;
  > div:first-child {
    width: 50px;
    height: 50px;
    margin-right: 0.6rem;
    > img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  > div:last-child {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:first-child {
      display: flex;
      flex-direction: column;
      > span:first-child {
        font-size: 1.2rem;
        font-weight: 540;
      }
      > span:last-child {
        padding-top: 0.4rem;
        font-size: 1rem;
        color: ${vars.fontColorTwo};
      }
    }
    > div:last-child {
      > i {
        font-size: 1.6rem;
        color: ${vars.fontColorTwo};
      }
    }
  }
`;

const AlbumWrapper = styled.div`
  > div {
    display: flex;
    padding: 0.8rem;
    padding-top: 0;
    > div:first-child {
      padding-right: 0.8rem;
      > img {
        height: 60px;
        width: 60px;
      }
    }
    > div:last-child {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > span:first-child {
        padding-bottom: 0.8rem;
        font-size: 1.2rem;
        font-weight: 540;
        ${hiddenFont(240)};
      }
      > span:last-child {
        color: #c0c0c0;
        font-size: 1rem;
      }
    }
  }
`;
const MvWrapper = styled.div`
  > div {
    display: flex;
    padding: 0.8rem;
    padding-top: 0;
    > div:first-child {
      padding-right: 0.8rem;
      > img {
        height: 50px;
        width: 100px;
      }
    }
    > div:last-child {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > span:first-child {
        padding-bottom: 0.6rem;
        font-size: 1.2rem;
        font-weight: 540;
        ${hiddenFont(240)};
      }
      > span:last-child {
        color: #c0c0c0;
        font-size: 1rem;
      }
    }
  }
`;

class Search extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      hotkey: [],
      smartBox: [],
      type: typeEnum.SONG,
      searchMap: {}
    };
  }
  async componentDidMount() {
    const response = await fetch.get('/hotkey');
    if (response.code === 0) {
      let hotkey = _.map(response.data.hotkey, (t) => t.k.trim());
      this.setState({
        hotkey
      });
    }
  }
  componentDidUpdate(p, prevState) {
    if (this.state.searchText !== prevState.searchText) {
      if (!this.state.searchText) {
        this.setState({
          searchMap: {},
          smartBox: []
        });
      }
    }
  }
  goBack = () => {
    history.goBack();
  };
  handleSearchTextChange = (e) => {
    let { value: searchText } = e.target;

    this.setState(
      {
        searchText
      },
      () => {
        this.searchSmartBox(searchText);
      }
    );
  };
  searchSmartBox = _.debounce(async (key) => {
    const response = await fetch.get('/smartBox', {
      params: {
        key
      }
    });
    if (response.code === 0) {
      let array = [];
      _.forIn(response.data, (item) => {
        let names = _.map(item.itemlist, (t) => t.name);
        array.push(names);
      });
      this.setState({
        smartBox: _.flattenDeep(array)
      });
    }
  }, 300);
  emptyText = () => {
    const { searchText } = this.state;
    if (!!searchText) {
      this.setState({
        searchText: ''
      });
      this.searchInputDom.focus();
    }
  };
  hotkeySelect = (val) => {
    this.setState(
      {
        searchText: val
      },
      () => {
        this.search(val, this.state.type);
      }
    );
  };
  smartBoxSelect = (val) => {
    this.setState(
      {
        searchText: val,
        smartBox: []
      },
      () => {
        this.search(val, this.state.type);
      }
    );
  };
  search = async (val, type) => {
    if (!val) {
      return;
    }
    const response = await fetch.get('/search', {
      params: {
        val,
        type: type.value
      }
    });
    if (response.code === 0) {
      this.setState((prevState) => {
        prevState.searchMap[type.key] = response.data;
        return {
          searchMap: prevState.searchMap
        };
      });
    }
  };
  formatTime = (time) => {
    let m = (time / 60) | 0;
    let s = (time % 60) | 0;
    if (s.toString().length === 1) {
      s = '0' + s;
    }
    return `${m}:${s}`;
  };
  enterSinger = (item) => {
    history.push({
      pathname: `${'musicu'}/singers/${item['singerMID']}`,
      search: `name=${item['singerName']}`
    });
  };
  enterAlbum = (item) => {
    history.push({
      pathname: `/musicu/album/${item['albumID']}`
    });
  };
  tabChange = ({ key }) => {
    const { searchMap, searchText } = this.state;
    let type = {};

    _.forIn(typeEnum, (t) => {
      if (t.key === key) {
        type = t;
        return false;
      }
    });
    if (!searchMap[key]) {
      this.search(searchText, type);
    }
    this.setState({
      type
    });
  };
  renderTabContent = (tab) => {
    let { searchMap } = this.state;
    let component = null;
    let data = searchMap[tab.key];
    if (data) {
      switch (tab.key) {
        case typeEnum.SONG.key: {
          let songs = data.song.list;
          let zjpp = data.zhida;
          _.forEach(songs, (song) => {
            song['albumname'] = song.album.name;
            song['albummid'] = song.album.mid;
            song['songname'] = song.name;
            song['songmid'] = song.mid;
            song['songid'] = song.id;
            song['vid'] = song.mv.vid;
          });
          component = (
            <SongWrapper>
              {zjpp.type === 1 || zjpp.type === 2 ? (
                <ZjppWrapper>
                  <div>
                    <span>最佳匹配</span>
                  </div>
                  {zjpp.type === 1 ? (
                    <ZjppSingerWrapper>
                      <div>
                        <img
                          alt={zjpp.zhida_singer.singerName}
                          src={zjpp.zhida_singer.singerPic}
                        />
                      </div>
                      <div onClick={this.enterSinger.bind(null, zjpp.zhida_singer)}>
                        <div>
                          <span>{`歌手: ${zjpp.zhida_singer.singerName}`}</span>
                          <span>{`单曲: ${zjpp.zhida_singer.songNum} 专辑:${
                            zjpp.zhida_singer.albumNum
                          }`}</span>
                        </div>
                        <div>
                          <Icon className={'icon-jiantouyou'} />
                        </div>
                      </div>
                    </ZjppSingerWrapper>
                  ) : (
                    <ZjppAlbumWrapper>
                      <div>
                        <img
                          alt={zjpp.zhida_album.albumName}
                          src={zjpp.zhida_album.albumPic}
                        />
                      </div>
                      <div
                        onClick={this.enterAlbum.bind(null, zjpp.zhida_album)}
                      >
                        <div>
                          <span>{`专辑: ${zjpp.zhida_album.albumName}`}</span>
                          <span>{`${zjpp.zhida_album.singerName}`}</span>
                        </div>
                        <div>
                          <Icon className={'icon-jiantouyou'} />
                        </div>
                      </div>
                    </ZjppAlbumWrapper>
                  )}
                </ZjppWrapper>
              ) : null}
              <div>
                <Songs songs={songs} />
              </div>
            </SongWrapper>
          );
          break;
        }
        case typeEnum.ALBUM.key: {
          let albums = data.album.list;
          component = (
            <AlbumWrapper>
              {_.map(albums, (item, idx) => (
                <div key={idx}>
                  <div>
                    <img
                      alt={item.albumName}
                      src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${
                        item.albumMID
                      }.jpg?max_age=2592000`}
                    />
                  </div>
                  <div>
                    <span>{item.albumName}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${item.singerName}&nbsp;&nbsp;${
                          item.publicTime
                        }`
                      }}
                    />
                  </div>
                </div>
              ))}
            </AlbumWrapper>
          );
          break;
        }
        case typeEnum.MV.key: {
          let mvs = data.mv.list;
          component = (
            <MvWrapper>
              {_.map(mvs, (item, idx) => (
                <div key={idx}>
                  <div>
                    <img
                      alt={item.mv_name}
                      src={`https://shp.qpic.cn/qqvideo_ori/0/${
                        item.v_id
                      }_360_204/0`}
                    />
                  </div>
                  <div>
                    <span>{item.mv_name}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${
                          item.singerName_hilight
                        }&nbsp;&nbsp;${this.formatTime.call(
                          null,
                          item.duration
                        )}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </MvWrapper>
          );
          break;
        }
        default: {
          break;
        }
      }
    }
    return <Scroll>{component}</Scroll>;
  };
  render() {
    const {} = this.props;
    const { searchText, smartBox, searchMap } = this.state;
    const hotkey = _.sampleSize(this.state.hotkey, 10);
    return (
      <Wrapper>
        <TitleWrapper>
          <div onClick={this.goBack}>
            <Icon className="icon-jiantou" />
          </div>
          <div>
            <input
              ref={(dom) => (this.searchInputDom = dom)}
              placeholder={'搜索音乐,MV,歌单'}
              value={searchText}
              onChange={this.handleSearchTextChange}
              autoFocus={true}
            />
          </div>
          <div onClick={this.emptyText}>
            <Icon className={!!searchText ? 'icon-guanbi' : 'icon-maikefeng'} />
          </div>
        </TitleWrapper>
        {!searchText && !_.isEmpty(hotkey) ? (
          <HotkeyWrapper>
            <div>
              <span>热门</span>
            </div>
            <div>
              {_.map(hotkey, (val, i) => (
                <span onClick={this.hotkeySelect.bind(null, val)} key={i}>
                  {val}
                </span>
              ))}
            </div>
          </HotkeyWrapper>
        ) : null}
        {!!searchText && !_.isEmpty(smartBox) ? (
          <SmartBoxWrapper>
            <div onClick={this.smartBoxSelect.bind(null, searchText)}>
              <span>{`搜索 "${searchText}"`}</span>
            </div>
            <div>
              {_.map(smartBox, (val, i) => (
                <div key={i} onClick={this.smartBoxSelect.bind(null, val)}>
                  <div>
                    <Icon className={'icon-icon-8'} />
                  </div>
                  <div>
                    <span>{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </SmartBoxWrapper>
        ) : null}
        {!!searchText && !_.isEmpty(searchMap) ? (
          <ContentWrapper>
            <Tabs
              tabBarActiveTextColor={vars.themeColor}
              tabBarUnderlineStyle={{
                border: `1px ${vars.themeColor} solid`
              }}
              tabs={tabs}
              initialPage={0}
              onChange={this.tabChange}
              swipeable={false}
            >
              {this.renderTabContent}
            </Tabs>
          </ContentWrapper>
        ) : null}
      </Wrapper>
    );
  }
}
export default Search;
