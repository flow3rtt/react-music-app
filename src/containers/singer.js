import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import history from '../history';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import { connect } from 'react-redux';
import * as vars from '../assets/style/var';
import Songs from './songs';
import { getSingerMapAsync } from '../store/reducers/persist';
import { findDOMNode } from 'react-dom';
import { full, hiddenFont } from '../assets/style/const';
import { Tabs } from 'antd-mobile';
const Wrapper = styled.div`
  background-color: ${vars.backgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  z-index: 4;
  height: 3rem;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  color: ${vars.fontColor};
  span {
    font-size: 1.4rem;
    font-weight: 520;
  }
  i {
    font-size: 1.8rem;
  }
`;

const BgImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;
`;
const FilterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.4);
`;
const InfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  > div:first-child {
    > span {
      font-size: 1.8rem;
      font-weight: 520;
      color: white;
    }
  }
  > div:last-child {
    display: flex;
    padding: 1.2rem 1rem;
    span {
      margin: 0 1rem;
      padding: 0.2rem 1.6rem;
      border: 1px solid white;
      border-radius: 1rem;
      color: white;
    }
  }
`;
const OverlayWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${vars.backgroundColor};
`;
const ContentWrapper = styled.div`
  position: absolute;
  ${full};
  top: 70vw;
`;

const tabs = [
  { title: '歌曲', key: 'song' },
  { title: '专辑', key: 'album' },
  { title: 'MV', key: 'mv' }
];

const SongWrapper = styled.div``;
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

class Singer extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      type: 'song'
    };
  }
  componentDidMount() {
    this.init()
  }
  componentDidUpdate(prevProps) {
    const { singer,singerMap } = this.props;
    
    if (singer.mid !== prevProps.singer.mid) {
      this.init()
    }
    if (_.isEmpty(prevProps.singerMap) && !_.isEmpty(singerMap)) {
      this.reset()
    }
  }
  init = ()=>{
    const { singerMap, onGetSingerMapAsync, singer } = this.props;
    const { type } = this.state;
    let mid = singer.mid;
    if (_.isEmpty(singerMap) || !singerMap[type]) {
      onGetSingerMapAsync({
        type,
        mid
      });
    }
  }
  goBack = () => {
    history.push({
      pathname: `/musicu/singers`
    });
  };

  enterAlbum = (item) => {
    history.push({
      pathname: `/musicu/album/${item['albumID']}`
    });
  };
  tabChange = ({ key }, index) => {
    const { singerMap, onGetSingerMapAsync, singer } = this.props;
    let mid = singer.mid;
    if (_.isEmpty(singerMap) || !singerMap[key]) {
      onGetSingerMapAsync({
        mid,
        type: key
      });
    }
    this.setState(
      {
        type: key
      },
      this.reset
    );
  };
  reset = () => {
    this.scrollCmp.scrollTo(0, 0, 200);
    this.infoDom.style['display'] = '';
    this.titleDom.textContent = '';
    this.bgImageDom.style.paddingTop = '70%';
    this.bgImageDom.style.zIndex = ``;
    this.bgImageDom.style.height = 0;
    setTimeout(() => {
      this.overlayDom.style['transform'] = ``;
    }, 210);
  };
  handleScroll = (pos) => {
    const { singer } = this.props;
    let y = -pos.y;
    let maxY = window.innerWidth * 0.7 - 12 * 3;
    y = Math.min(y, maxY);
    this.overlayDom.style['transform'] = `translate3d(0,${-y}px,0)`;
    let scale = 1;
    const formula = Math.abs(-pos.y / window.innerWidth * 0.7);
    if (y < 0) {
      scale = 1 + formula;
      this.bgImageDom.style['transform'] = `scale(${scale})`;
    }
    if (-pos.y > 5 * 12) {
      this.infoDom.style['display'] = 'none';
      this.titleDom.textContent = singer.name;
    } else {
      this.infoDom.style['display'] = '';
      this.titleDom.textContent = '';
    }
    if (-pos.y > maxY) {
      this.bgImageDom.style.paddingTop = 0;
      this.bgImageDom.style.height = `${12 * 3}px`;
      this.bgImageDom.style.zIndex = `2`;
    } else {
      this.bgImageDom.style.paddingTop = '70%';
      this.bgImageDom.style.zIndex = ``;
      this.bgImageDom.style.height = 0;
    }
  };
  renderTabContent = (tab) => {
    const { singerMap } = this.props;
    const { type } = this.state;
    let values = [];
    if (!_.isEmpty(singerMap)) {
      values = !!singerMap[type] ? singerMap[type]['list'] : [];
    }
    switch (tab.key) {
      case 'song': {
        let songs = [];
        if (!_.isEmpty(values) && type === 'song') {
          songs = _.map(values, (value) => value['musicData']);
        }
        return (
          <SongWrapper>
            <Songs songs={songs} />
          </SongWrapper>
        );
      }

      case 'album': {
        let albums = [];
        if (!_.isEmpty(values) && type === 'album') {
          albums = values;
        }
        return (
          <AlbumWrapper>
            {_.map(albums, (item, idx) => (
              <div key={idx} onClick={this.enterAlbum.bind(null, item)}>
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
                  <span>{item.pubTime}</span>
                </div>
              </div>
            ))}
          </AlbumWrapper>
        );
      }

      case 'mv': {
        let mvs = [];
        if (!_.isEmpty(values) && type === 'mv') {
          mvs = values;
        }
        return (
          <MvWrapper>
            {_.map(mvs, (item, idx) => (
              <div key={idx}>
                <div>
                  <img
                    alt={item.title}
                    src={`https://shp.qpic.cn/qqvideo_ori/0/${
                      item.vid
                    }_360_204/0`}
                  />
                </div>
                <div>
                  <span>{item.title}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </MvWrapper>
        );
      }

      default:
        break;
    }
  };
  render() {
    const { singer, singerMap } = this.props;
    return (
      <Wrapper>
        <TitleWrapper>
          <div onClick={this.goBack}>
            <Icon className="icon-jiantou" />
          </div>
          <div>
            <span ref={(dom) => (this.titleDom = dom)}>{}</span>
          </div>
          <div>
            <Icon className="icon-gengduo2" />
          </div>
        </TitleWrapper>
        {!_.isEmpty(singer) ? (
          <React.Fragment>
            <BgImageWrapper
              style={{
                backgroundImage: `url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${
                  singer.mid
                }.jpg?max_age=2592000)`
              }}
              ref={(cmp) => (this.bgImageDom = findDOMNode(cmp))}
            >
              <FilterWrapper />
              <InfoWrapper ref={(cmp) => (this.infoDom = findDOMNode(cmp))}>
                <div>
                  <span>{singer.name}</span>
                </div>
                <div>
                  <div>
                    <span>关注</span>
                  </div>
                  <div>
                    <span>勋章</span>
                  </div>
                </div>
              </InfoWrapper>
            </BgImageWrapper>
            <OverlayWrapper
              ref={(cmp) => (this.overlayDom = findDOMNode(cmp))}
            />
          </React.Fragment>
        ) : null}
        {!_.isEmpty(singerMap) ? (
          <ContentWrapper>
            <Scroll
              ref={(cmp) => (this.scrollCmp = cmp)}
              probeType={3}
              onScroll={this.handleScroll}
            >
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
            </Scroll>
          </ContentWrapper>
        ) : null}
      </Wrapper>
    );
  }
}
const getSingerMap = (persist, mid) => {
  return persist.singerMap[mid] || {};
};

const mstp = ({ persist }) => {
  let pathname = history.location.pathname;
  const mid = pathname.substring(pathname.lastIndexOf('/') + 1);
  const name = decodeURI(
    history.location.search.substring(
      history.location.search.lastIndexOf('=') + 1
    )
  );

  return {
    singerMap: getSingerMap(persist, mid),
    singer: {
      mid,
      name
    }
  };
};
const mdtp = (dispatch) => {
  return {
    onGetSingerMapAsync: (payload) => {
      dispatch(getSingerMapAsync(payload));
    }
  };
};
export default connect(mstp, mdtp)(Singer);
