import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  toggleScreen,
  setIng,
  setMode,
  selectSong
} from '../store/reducers/play';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import cx from 'classnames';
import * as vars from '../assets/style/var';
import { hiddenFont } from '../assets/style/const';
import Lyric from 'lyric-parser';
import { Base64 } from 'js-base64';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import AlloyFinger from 'alloyfinger';
import Songlist from './songlist';
import { Modal } from 'antd-mobile';
import history from '../history';

const operation = Modal.operation;

const rotate = keyframes`  
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const MiniWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  > div:first-child {
    flex: 1;
    > span:first-child {
      font-weight: 550;
    }
    > div {
      display: flex;
      align-items: center;
      > div:first-child {
        > img {
          border-radius: 50%;
          height: 46px;
          width: 46px;
          animation: ${rotate} 8s linear infinite;
          animation-play-state: paused;
          &.active {
            animation-play-state: running;
          }
        }
        padding-right: 0.6rem;
      }
      > div:last-child {
        display: flex;
        flex-direction: column;
        height: 100%;
        > * {
          ${hiddenFont(180)};
        }
        > span {
          padding-bottom: 0.4rem;
          font-size: 1.2rem;
          font-weight: 520;
        }
        > p {
          color: ${vars.themeColor};
          font-size: 1rem;
        }
      }
    }
  }
  > div:last-child {
    display: flex;
    height: 100%;
    align-items: center;
    > i {
      color: ${vars.themeColor};
      padding: 1rem;
      font-size: 2rem;
    }
    > i:first-child {
      font-size: 2.6rem;
      padding-right: 0;
    }
  }
`;
const NormalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: ${vars.backgroundColor};
  display: flex;
  flex-direction: column;
`;
const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: black;
  > img {
    height: 100%;
    width: 100%;
    filter: blur(30px);
  }
`;
const TitleWrapper = styled.div`
  z-index: 4;
  height: 3rem;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  color: ${vars.fontColor};
  > div:first-child {
    transform: rotate(90deg);
  }
  > div:nth-child(2) {
    flex: 1;
    text-align:center;
    ${hiddenFont(250)}
  }
  span {
    font-size: 1.4rem;
    font-weight: 520;
  }
  i {
    font-size: 1.8rem;
  }
`;
const InfoWrapper = styled.div`
  height: 2rem;
  line-height: 2rem;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  > span {
    font-size: 1.2rem;
  }
`;
const Middle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  display: flex;
  flex: 2;
  width: 200vw;
  > div {
    display: inline-block;
    width: 100vw;
  }
`;
const Left = styled.div`
  transition: opacity 400ms ease-in;
  > div:first-child {
    margin: 0 0.8rem;
    > img {
      height: 80%;
      width: 100%;
      border-radius: 50%;
      border: 0.8rem solid rgba(52, 52, 52, 0.2);
      animation: ${rotate} 10s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
    }
  }
  > div:last-child {
    height: 2rem;
    justify-content: center;
    display: flex;
    line-height: 2rem;
    margin-bottom: 0.6rem;
    > p {
      width: 80%;
      color: ${vars.themeColor};
      font-size: 1.2rem;
      ${hiddenFont()};
      max-width: unset;
      text-align: center;
    }
  }
`;
const Right = styled.div`
  transition: transform 300ms ease-in;
  position: relative;
`;
const LyricWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    padding: 0.4rem;
    flex-direction: column;
    > p:first-child {
      padding-bottom: 0.4rem;
      &.active {
        font-size: 1.2rem;
      }
    }
    > p {
      margin: 0 auto;
      width: 88%;
      text-align: center;
      ${hiddenFont()};
      max-width: unset;
      color: ${vars.fontColorTwo};
      &.active {
        color: ${vars.themeColor};
      }
    }
  }
`;
const TransBtnWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 1rem;
  i {
    font-size: 2rem;
    color: ${vars.fontColorTwo};
    &.active {
      color: ${vars.themeColor};
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.9;
`;
const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.6rem 0;
  > div {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: ${vars.fontColorTwo};
    margin: 0 0.3rem;
    &.active {
      background-color: white;
      width: 12px;
      border-radius: 4px;
    }
  }
`;

const Process = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  > div:first-child,
  > div:last-child {
    padding: 0 0.6rem;
    > span {
      color: ${vars.fontColorTwo};
    }
  }
  > div:nth-child(2) {
    flex: 1;
    position: relative;
    height: 0.2rem;
    background-color: rgba(52, 52, 52, 0.2);
    border-radius: 0.1rem;
    > div {
      background-color: ${vars.themeColor};
      position: absolute;
    }
    > div:first-child {
      top: 0;
      bottom: 0;
    }
    > div:last-child {
      height: 1rem;
      width: 1rem;
      top: -0.325rem;
      border-radius: 50%;
    }
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    align-items: center;
  }
  i {
    color: ${vars.fontColorTwo};
    font-size: 2.2rem;
  }
  > div:first-child {
    i {
      color: ${vars.themeColor};
    }
    i:first-child {
      font-size: 2.6rem;
    }
    i:nth-child(3) {
      font-size: 3.8rem;
    }
    i:nth-child(2),
    i:nth-child(4) {
      font-size: 2.8rem;
    }
    i:last-child,
    i:first-child {
      color: ${vars.fontColorTwo};
    }
  }
`;
class Player extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      lyricLine: -1,
      lyricLines: [],
      trans: false,
      dotIndex: 0,
      time: 0,
      songlistOpen: false
    };
    this.lyric = null;
    this.touch = {};
  }
  componentDidMount() {
    setTimeout(() => {
      document.body.addEventListener('click', this.audioInit);
    }, 20);
  }
  componentDidUpdate(prevProps, pervState) {
    if (!!this.props.song.url && prevProps.song.url !== this.props.song.url) {
      if (!!this.lyric) {
        this.lyric.stop();
        this.setState({
          lyricLine: -1,
          lyricLines: []
        });
      }
      this.lyric = new Lyric(
        Base64.decode(this.props.song.lyric.main),
        this.haddleLyric
      );
      if (!!this.props.song.lyric.tran) {
        this.tranLyric = new Lyric(Base64.decode(this.props.song.lyric.tran));
      } else {
        this.setState({
          trans: false
        });
      }
      this.setState({
        lyricLines: this.lyric.lines
      });
      setTimeout(() => {
        if (this.props.ing) {
          this.lyric.play();
          this.audio.play();
          if (!this.af) {
            this.af = new AlloyFinger(this.middleDom, {
              swipe: this.swipe
            });
          }
        }
      }, 20);
    }
    if (prevProps.ing !== this.props.ing) {
      if (_.isEmpty(this.props.song)) {
        return;
      }
      this.lyric.togglePlay();
      if (this.props.ing) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
    if (pervState.dotIndex !== this.state.dotIndex) {
      let val = this.state.dotIndex;
      let leftDom = this.middleDom.children[0];
      let rightDom = this.middleDom.children[1];
      if (val === 0) {
        rightDom.style.transform = 'translate3d(0%,0,0)';
        leftDom.style.opacity = 1;
      } else {
        rightDom.style.transform = 'translate3d(-100%,0,0)';
        leftDom.style.opacity = 0;
      }
    }
  }
  audioInit = () => {
    this.audio.play();
    document.body.removeEventListener('click', this.audioInit);
  };
  swipe = ({ direction }) => {
    const { dotIndex } = this.state;
    if (direction === 'Left' && dotIndex === 0) {
      this.setState({
        dotIndex: 1
      });
      return;
    }
    if (direction === 'Right' && dotIndex === 1) {
      this.setState({
        dotIndex: 0
      });
      return;
    }
  };
  formatSinger = (singers) => {
    return _.map(singers, (singer) => singer.name).join('/');
  };
  toggleIng = () => {
    const { ing, onSetIng, song } = this.props;
    if (_.isEmpty(song)) {
      return;
    }
    onSetIng(!ing);
  };
  haddleLyric = ({ lineNum }) => {
    this.setState({
      lyricLine: lineNum
    });
    if (!this.lyricScrollCmp) {
      return;
    }
    this.lyricScrollCmp.scrollToElement(
      this.lyricWrapperDom.children[lineNum > 6 ? lineNum - 5 : lineNum],
      300
    );
  };
  toggleTrans = () => {
    this.setState((prevState) => ({
      trans: !prevState.trans
    }));
  };
  formatTime = (time) => {
    let m = (time / 60) | 0;
    let s = (time % 60) | 0;
    if (s.toString().length === 1) {
      s = '0' + s;
    }
    return `${m}:${s}`;
  };
  timeUpdate = () => {
    if (this.touch.init) {
      return;
    }
    this.setState({
      time: this.audio.currentTime
    });
  };
  changeMode = () => {
    let { mode, onSetMode } = this.props;
    ++mode;
    if (mode > 2) {
      mode = 0;
    }
    onSetMode(mode);
  };
  prev = () => {
    const { list, index, mode, onSelectSong } = this.props;
    if (_.size(list) === 1) {
      this.loop();
      return;
    }
    let idx = index - 1;
    if (idx < 0) {
      idx = _.size(list) - 1;
    }
    if (mode === 2) {
      let t = -1;
      do {
        t = _.random(0, _.size(list) - 1);
      } while (t === index);
      idx = t;
    }
    onSelectSong({
      list,
      index: idx
    });
  };
  next = () => {
    const { list, index, mode, onSelectSong } = this.props;
    if (_.size(list) === 1) {
      this.loop();
      return;
    }
    let idx = index + 1;
    if (idx > _.size(list) - 1) {
      idx = 0;
    }
    if (mode === 2) {
      let t = -1;
      do {
        t = _.random(0, _.size(list) - 1);
      } while (t === index);
      idx = t;
    }
    onSelectSong({
      list,
      index: idx
    });
  };
  loop = () => {
    let { onSetIng } = this.props;
    this.audio.pause();
    onSetIng(false);
    this.lyric.seek(0);
    this.audio.currentTime = 0;
    this.audio.play();
    this.lyricScrollCmp.scrollToElement(this.lyricWrapperDom.children[0], 300);
    onSetIng(true);
  };
  ended = () => {
    if (this.props.mode === 1) {
      this.loop();
      return;
    } else {
      this.next();
    }
  };

  processClick = (e) => {
    const { song } = this.props;
    let { pageX } = e;
    let left = this.processDom.getBoundingClientRect().left;
    let w = this.processDom.clientWidth;
    let percent = (pageX - left) / w;
    let time = song.interval * percent;
    this.audio.currentTime = time;
    this.lyric.seek(time * 1000);
    this.setState({
      time
    });
  };
  progressTouchstart = (e) => {
    this.touch.init = true;
    this.touch.startX = e.touches[0].pageX;
    this.touch.left = this.processDom.children[0].clientWidth;
  };
  progressTouchmove = (e) => {
    const { song } = this.props;
    if (!this.touch.init) return;
    let deltaX = e.touches[0].pageX - this.touch.startX;
    let offsetWidth = Math.min(
      this.processDom.clientWidth - 6,
      Math.max(0, this.touch.left + deltaX)
    );
    let percent = offsetWidth / this.processDom.clientWidth;
    let time = song.interval * percent;
    this.setState({
      time
    });
  };
  progressTouchend = () => {
    const { time } = this.state;
    this.touch.init = false;
    this.audio.currentTime = time;
    this.lyric.seek(time * 1000);
  };

  drawerOpenChange = (bool) => {
    this.setState({
      songlistOpen: bool
    });
  };
  jumpMeta = () => {
    operation([
      { text: '查看歌手', onPress: this.lookSinger },
      { text: '查看专辑', onPress: this.lookAlbum }
    ]);
  };
  lookSinger = () => {
    const { song, onToggleScreen } = this.props;
    if (_.size(song.singer) === 1) {
      history.replace({
        pathname: `/musicu/singers/${song.singer[0].mid}`,
        search: `name=${song.singer[0].name}`
      });
      onToggleScreen();
    } else {
      operation(
        _.map(song.singer, (t) => {
          return {
            text: `${t.name}`,
            onPress: () => {
              history.push({
                pathname: `/musicu/singers/${t.mid}`,
                search: `name=${t.name}`
              });
              onToggleScreen();
            }
          };
        })
      );
    }
  };
  lookAlbum = () => {
    const { song, onToggleScreen } = this.props;
    const id = song.album ? song.album.id : song.albumid;
    let pathname = `/musicu/album/${id}`;
    if (history.location.pathname !== pathname) {
      history.push({
        pathname
      });
    }
    onToggleScreen();
  };
  render() {
    const { fullScreen, song, onToggleScreen, ing, mode } = this.props;
    const {
      lyricLine,
      trans,
      lyricLines,
      dotIndex,
      time,
      songlistOpen
    } = this.state;
    const imgUrl = !_.isEmpty(song)
      ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
          song.albummid
        }.jpg?max_age=2592000`
      : '';
    const songurl = !_.isEmpty(song) ? song.url : 'http://t.cn/R8fED9W';
    let lyricTxt = '';
    if (lyricLine !== -1 && !_.isEmpty(lyricLines)) {
      if (
        !!this.tranLyric &&
        trans &&
        this.tranLyric.lines[lyricLine].txt.trim() !== '//'
      ) {
        lyricTxt = this.tranLyric.lines[lyricLine].txt;
      } else {
        lyricTxt = lyricLines[lyricLine].txt;
      }
    }
    let modeIcon = '';
    if (mode === 0) {
      modeIcon = 'icon-icon-7';
    } else if (mode === 1) {
      modeIcon = 'icon-icon-6';
    } else {
      modeIcon = 'icon-icon-9';
    }
    let percent = 0;
    if (!_.isEmpty(song)) {
      percent = time / song.interval;
    }
    return (
      <Wrapper>
        <MiniWrapper
          style={{
            display: fullScreen ? 'none' : ''
          }}
        >
          {_.isEmpty(song) ? (
            <div>
              <span>QQ音乐 听我想听的歌</span>
            </div>
          ) : (
            <div>
              <div onClick={onToggleScreen}>
                <div>
                  <img
                    className={cx({ active: ing })}
                    src={imgUrl}
                    alt={song.songname}
                  />
                </div>
                <div>
                  <span>{song.songname}</span>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: lyricTxt
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <Icon
              onClick={this.toggleIng}
              className={!ing ? 'icon-icon-12' : 'icon-icon-5'}
            />
            <Icon
              onClick={this.drawerOpenChange.bind(null, !songlistOpen)}
              className="icon-icon-11"
            />
          </div>
        </MiniWrapper>
        {!_.isEmpty(song) ? (
          <NormalWrapper
            style={{
              display: !fullScreen ? 'none' : ''
            }}
          >
            <Background>
              <img src={imgUrl} alt={song.songname} />
            </Background>
            <TitleWrapper>
              <div onClick={onToggleScreen}>
                <Icon className="icon-jiantouyou" />
              </div>
              <div>
                <span>{song.songname}</span>
              </div>
              <div onClick={this.jumpMeta}>
                <Icon className="icon-gengduo2" />
              </div>
            </TitleWrapper>
            <InfoWrapper>
              <span>{`-- ${this.formatSinger.call(
                null,
                song.singer
              )} --`}</span>
            </InfoWrapper>
            <Middle ref={(cmp) => (this.middleDom = findDOMNode(cmp))}>
              <Left>
                <div onClick={this.jumpMeta}>
                  <img
                    className={cx({ active: ing })}
                    src={imgUrl}
                    alt={song.songname}
                  />
                </div>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: lyricTxt
                    }}
                  />
                </div>
              </Left>
              <Right>
                <Scroll ref={(cmp) => (this.lyricScrollCmp = cmp)}>
                  <LyricWrapper
                    ref={(cmp) => (this.lyricWrapperDom = findDOMNode(cmp))}
                  >
                    {_.map(lyricLines, (item, idx) => (
                      <li key={idx}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.txt
                          }}
                          className={cx({ active: idx === lyricLine })}
                        />
                        {trans ? (
                          <p className={cx({ active: idx === lyricLine })}>
                            {this.tranLyric.lines[idx].txt === '//'
                              ? ''
                              : this.tranLyric.lines[idx].txt}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </LyricWrapper>
                </Scroll>
                {!!song.lyric.tran ? (
                  <TransBtnWrapper>
                    <Icon
                      onClick={this.toggleTrans}
                      className={cx({ active: trans }, 'icon-weibiaoti556')}
                    />
                  </TransBtnWrapper>
                ) : null}
              </Right>
            </Middle>
            <Bottom>
              <DotsWrapper>
                <div className={cx({ active: dotIndex === 0 })} />
                <div className={cx({ active: dotIndex === 1 })} />
              </DotsWrapper>
              <Process>
                <div>
                  <span>{this.formatTime.call(null, time)}</span>
                </div>
                <div
                  onClick={this.processClick}
                  ref={(dom) => (this.processDom = dom)}
                >
                  <div
                    style={{
                      width: `${percent * 100}%`
                    }}
                  />
                  <div
                    onTouchStart={this.progressTouchstart}
                    onTouchMove={this.progressTouchmove}
                    onTouchEnd={this.progressTouchend}
                    style={{
                      left: `calc(${percent * 100}% - 0.5rem)`
                    }}
                  />
                </div>
                <div>
                  <span>{this.formatTime.call(null, song.interval)}</span>
                </div>
              </Process>
              <Control>
                <div>
                  <Icon onClick={this.changeMode} className={modeIcon} />
                  <Icon onClick={this.prev} className="icon-icon-4" />
                  <Icon
                    onClick={this.toggleIng}
                    className={!ing ? 'icon-icon-12' : 'icon-icon-5'}
                  />
                  <Icon onClick={this.next} className="icon-icon-2" />
                  <Icon
                    onClick={this.drawerOpenChange.bind(null, !songlistOpen)}
                    className="icon-icon-11"
                  />
                </div>
                <div>
                  <Icon className="icon-love" />
                  <Icon className="icon-xiazai" />
                  <Icon className="icon-fenxiang" />
                  <Icon className="icon-pinglun" />
                </div>
              </Control>
            </Bottom>
          </NormalWrapper>
        ) : null}
        <Songlist
          open={songlistOpen}
          onChangeDrawerOpen={this.drawerOpenChange}
        />
        <audio
          onTimeUpdate={this.timeUpdate}
          onEnded={this.ended}
          src={songurl}
          ref={(dom) => (this.audio = dom)}
        />
      </Wrapper>
    );
  }
}
const getPlay = createSelector(
  (state) => state.play,
  (play) => {
    if (!play || _.isEmpty(play)) {
      return {};
    }
    let song = {};
    if (!_.isEmpty(play.list) && play.index >= 0) {
      song = play.list[play.index];
    }
    return {
      ...play,
      song
    };
  }
);

const mstp = (state) => {
  return getPlay(state);
};
const mdtp = (dispatch) => ({
  onToggleScreen: () => {
    dispatch(toggleScreen());
  },
  onSetIng: (ing) => {
    dispatch(setIng(ing));
  },
  onSetMode: (mode) => {
    dispatch(setMode(mode));
  },
  onSelectSong: (payload) => {
    dispatch(selectSong(payload));
  }
});
export default connect(mstp, mdtp)(Player);
