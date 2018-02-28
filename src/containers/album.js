import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import history from '../history';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getAlbumMapAsync } from '../store/reducers/persist';
import * as vars from '../assets/style/var';
import { hiddenFont } from '../assets/style/const';
import { findDOMNode } from 'react-dom';
import Songs from './songs';
const Wrapper = styled.div`
  background-color: ${vars.backgroundColor};
  position: relative;
  overflow: hidden;
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
  > div:nth-child(2) {
    ${hiddenFont(180)};
    > span {
      font-size: 1.4rem;
      font-weight: 520;
    }
  }
  i {
    font-size: 1.8rem;
  }
`;

const BgImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 60%;
  transform-origin: top;
  background-size: cover;
  filter: blur(25px);
`;
const OverlayWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${vars.backgroundColor};
`;
const ContentWrapper = styled.div`
  position: absolute;
  top: 3rem;
  width: 100%;
  bottom: 0;
  overflow: hidden;
`;
const InfoWrapper = styled.div`
  display: flex;
  padding: 1.2rem 0;
  margin: 0 1.2rem;
  padding-bottom: 0;
  flex-direction: column;
  height: calc(70vw - 6rem);
  > div:first-child {
    display: flex;
    > div:first-child {
      margin-right: 1rem;
      height: 120px;
      width: 120px;
      > img {
        height: 100%;
        width: 100%;
      }
    }
    > div:last-child {
      display: flex;
      flex-direction: column;
      margin: 0.8rem 0;

      > div:first-child {
        > span {
          color: white;
          font-weight: 520;
          font-size: 1.3rem;
        }
      }
      > div:nth-child(2) {
        display: flex;
        align-items: center;
        margin: 0.8rem 0;
        > img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        > span {
          padding-left: 0.5rem;
          font-size: 1rem;
          color: ${vars.fontColor};
        }
      }
      > div:last-child {
        margin-top: 0.8rem;
        ${hiddenFont(180)};
        > span {
        }
      }
    }
  }
  > div:last-child {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.4rem;
    > div {
      display: flex;
      align-items: center;
      i {
        font-size: 2rem;
        color: ${vars.fontColor};
      }
      > span {
        margin-left: 0.2rem;
        color: ${vars.fontColor};
      }
    }
  }
`;

class Album extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { album, onGetAlbumMapAsync, id } = this.props;
    if (_.isEmpty(album)) {
      onGetAlbumMapAsync(id);
    }
  }
  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps['album']) && !_.isEmpty(this.props['album'])) {
    }
  }

  goBack = () => {
    history.goBack();
  };
  handleScroll = (pos) => {
    const { album } = this.props;
    let y = -pos.y;
    let maxY = window.innerWidth * 0.6 - 12 * 3;
    y = Math.min(y, maxY);
    this.overlayDom.style['transform'] = `translate3d(0,${-y}px,0)`;
    if (-pos.y > 5 * 12) {

      this.titleDom.innerHTML = album.album_name;
    } else {
      this.titleDom.textContent = '专辑';
    }
  };
  render() {
    const { album, songs } = this.props;
    const {} = this.state;
    return (
      <Wrapper>
        <TitleWrapper>
          <div onClick={this.goBack}>
            <Icon className="icon-jiantou" />
          </div>
          <div>
            <span ref={(cmp) => (this.titleDom = findDOMNode(cmp))}>
              {'专辑'}
            </span>
          </div>
          <div>
            <Icon className="icon-gengduo2" />
          </div>
        </TitleWrapper>
        {!_.isEmpty(album) ? (
          <React.Fragment>
            <BgImageWrapper
              style={{
                backgroundImage: `url(${`https://y.gtimg.cn/music/photo_new/T002R300x300M000${
                    album.album_mid
                  }.jpg?max_age=2592000`})`
              }}
            />
            <OverlayWrapper
              ref={(cmp) => (this.overlayDom = findDOMNode(cmp))}
            />
            <ContentWrapper>
              <Scroll probeType={3} onScroll={this.handleScroll}>
                <InfoWrapper>
                  <div>
                    <div>
                      <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.album_mid}.jpg?max_age=2592000`} alt={album.album_name} />
                    </div>
                    <div>
                      <div>
                        <span
                          dangerouslySetInnerHTML={{ __html: album.album_name }}
                        />
                      </div>
                      <div>
                        <img alt={album.singerinfo[0].singername} src={`https://y.gtimg.cn/music/photo_new/T001R150x150M000${
                                album.singerinfo[0].singermid
                              }.jpg?max_age=2592000`} />
                        <span>{album.singerinfo[0].singername}</span>
                      </div>
                      <div>
                        <span >{`简介:${album.desc}`}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Icon className="icon-love" />
                    </div>
                    <div>
                      <Icon className="icon-pinglun" />
                    </div>
                    <div>
                      <Icon className="icon-fenxiang" />
                      <span>分享</span>
                    </div>
                  </div>
                </InfoWrapper>
                <div>
                  <Songs index songs={songs} />
                </div>
              </Scroll>
            </ContentWrapper>
          </React.Fragment>
        ) : null}
      </Wrapper>
    );
  }
}

const getAlbum = (persist, id) => {
  return persist.albumMap[id] || {};
};
const getSongs = createSelector([getAlbum], (album) => {
  if (_.isEmpty(album)) {
    return [];
  }
  return album.songlist;
});

const mstp = ({ persist }) => {
  let pathname = history.location.pathname;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);
  return {
    album: getAlbum(persist, id),
    songs: getSongs(persist, id),
    id
  };
};
const mdtp = (dispatch) => {
  return {
    onGetAlbumMapAsync: (id) => {
      dispatch(getAlbumMapAsync(id));
    }
  };
};

export default connect(mstp, mdtp)(Album);
