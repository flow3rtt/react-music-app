import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getMusicuAsync } from '../store/reducers/persist';
import { Carousel } from 'antd-mobile';
import Scroll from '../components/scroll';
import Icon from '../components/icon';
import * as vars from '../assets/style/var';
import _ from 'lodash';
import { full, hiddenFont } from '../assets/style/const';
import TransitionRoute from '../components/transition-route';
import Songs from './songs';
import Singers from './singers';
import Ranks from './ranks';
import Flgds from './flgds';
import Album from './album';
import history from '../history';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  ${full};
  overflow: hidden;
`;

const SwipeWrapper = styled.div`
  > a {
    display: block;
    overflow: hidden;
    > img {
      display: block;
      overflow: hidden;
      height: 40vw;
    }
  }
`;

const LinkWrapper = styled.div`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem;
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    > i {
      color: ${vars.themeColor};
      font-size: 2.2rem;
    }
    > span {
      padding-top: 0.8rem;
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;

const GxdtWrapper = styled.div`
  display: flex;
  margin: 1rem 0.6rem;
  > div:first-child {
    position: relative;
    height: 120px;
    width: 120px;
    > img {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    > div {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      ${full};
      color: ${vars.fontColor};
      > i {
        font-size: 3rem;
      }
      > span {
        position: absolute;
        bottom: 1rem;
        font-size: 1.4rem;
      }
    }
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 1rem;
    > div {
      flex: 1;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div:first-child {
        display: flex;
        flex-direction: column;
        margin-left: 0.4rem;
        > span:first-child {
          font-weight: 540;
          font-size: 1.2rem;
          padding-bottom: 0.4rem;
        }
        > span:last-child {
          font-size: 1rem;
          color: ${vars.fontColorTwo};
          ${hiddenFont()};
        }
      }
      > div:last-child {
        > img {
          height: calc(60px - 0.5rem);
        }
      }
    }
    > div:first-child {
      margin-bottom: 0.4rem;
    }
    > div:last-child {
      margin-top: 0.4rem;
    }
  }
`;

const TitleWrapper = styled.div`
  height: 3rem;
  line-height: 3rem;
  position: relative;
  text-align: center;
  > span {
    font-size: 1.4rem;
    font-weight: 520;
    letter-spacing: 2px;
  }
  i {
    color: #d7d7d7;
    font-size: 1.6rem;
    position: absolute;
    right: 1rem;
  }
`;
const ChangeWrapper = styled.div`
  height: 3rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  > div {
    padding: 0.6rem 1rem;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    > span {
      padding-left: 0.4rem;
    }
  }
`;
const WntjgdWrapper = styled.div`
  > div {
    display: flex;
    margin-bottom: 1rem;
    > div {
      flex: 1;
      > div:first-child {
        margin-bottom: 0.4rem;
        position: relative;
        > div {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.4rem;
          display: flex;
          padding: 0 0.6rem;
          justify-content: space-between;
          align-items: center;
          > div:first-child {
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > span {
              padding-left: 0.2rem;
              // transform: translateY(0.2rem);
              color: ${vars.fontColor};
            }
            > i {
              font-size: 1.4rem;
              color: black;
            }
          }
          > div:last-child {
            > i {
              font-size: 2rem;
              color: ${vars.fontColor};
            }
          }
        }
      }
      > div:last-child {
        > span {
          font-size: 1rem;
          color: ${vars.fontColorTwo};
        }
      }
    }
    > div:nth-child(2) {
      margin: 0 0.2rem;
    }
  }
`;
const XgsfWrapper = styled.div``;

const RouteWrapper = styled.div`
  > div {
    > div {
      position: fixed;
      ${full};
      bottom: 5rem;
    }
  }
`;

class MusicuContainer extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      gds: [],
      songs: [],
      render: true
    };
  }
  componentDidMount() {
    const { musicu, onGetMusicuAsync } = this.props;
    if (_.isEmpty(musicu)) {
      onGetMusicuAsync();
    } else {
      this.randomGds();
      this.randomSongs();
    }
  }
  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps['musicu']) && !_.isEmpty(this.props['musicu'])) {
      this.randomGds();
      this.randomSongs();
    }
  }
  randomGds = _.debounce(() => {
    //使用防抖会导致多次渲染
    const { musicu } = this.props;
    if (_.isEmpty(musicu)) {
      return;
    }
    let gds = _.chunk(_.sampleSize(musicu['wntjgd'], 6), 3);
    this.setState({
      gds
    });
  }, 400);
  randomSongs = _.debounce(() => {
    const { musicu } = this.props;
    if (_.isEmpty(musicu)) {
      return;
    }
    let songs = _.sampleSize(musicu['xgsf'], _.random(40, 60));
    _.forEach(songs, (song) => {
      song['albumname'] = song.album.name;
      song['albummid'] = song.album.mid;
      song['songname'] = song.name;
      song['songmid'] = song.mid;
      song['songid'] = song.id;
      song['vid'] = song.mv.vid;
    });
    this.setState({
      songs
    });
  }, 400);
  swipeImgLoad = _.once(() => {
    window.dispatchEvent(new Event('resize'));
  });
  formatSinger = (singers) => {
    return _.map(singers, (singer) => singer.name).join('/');
  };
  enterRoute = (to) => {
    const { match } = this.props;
    const { location } = history;
    let path = `${match.url}/${to}`;
    if (path !== location.pathname) {
      history.push(path);
    }
  };
  render() {
    const { musicu, match } = this.props;
    if (_.isEmpty(musicu)) {
      return <Wrapper />;
    }
    const { gds, songs } = this.state;
    const { swipe, wntjgd, xgsf } = musicu;
    const firstGd = _.head(wntjgd);
    const firstSong = _.head(xgsf);
    return (
      <Wrapper>
        <Scroll>
          <div>
            <Carousel
              infinite
              autoplay
              dotActiveStyle={{
                backgroundColor: vars.themeColor
              }}
            >
              {_.map(swipe, (item, idx) => (
                <SwipeWrapper key={idx}>
                  <a href={`javascript:void(0)`}>
                    <img
                      onLoad={this.swipeImgLoad}
                      alt={item.cover}
                      src={item.pic_info.url}
                    />
                  </a>
                </SwipeWrapper>
              ))}
            </Carousel>
          </div>
          <LinkWrapper>
            <div onClick={this.enterRoute.bind(null, 'singers')}>
              <Icon className="icon-geshou" />
              <span>歌手</span>
            </div>
            <div onClick={this.enterRoute.bind(null, 'ranks')}>
              <Icon className="icon-paihang" />
              <span>排行</span>
            </div>
            <div onClick={this.enterRoute.bind(null, 'flgds')}>
              <Icon className="icon-leimupinleifenleileibie2" />
              <span>分类歌单</span>
            </div>
            <div>
              <Icon className="icon-shouyinji" />
              <span>电台</span>
            </div>
            <div>
              <Icon className="icon-shipin" />
              <span>视频</span>
            </div>
          </LinkWrapper>
          <GxdtWrapper>
            <div>
              <img
                src="http://y.gtimg.cn/music/common/upload/t_musichall_pic/1448974831271027900.jpg"
                alt="个性电台"
              />
              <div>
                <Icon className="icon-icon-12" />
                <span>个性电台</span>
              </div>
            </div>
            <div>
              <div  onClick={this.enterRoute.bind(null, 'flgds/'+firstGd.content_id)}>
                <div>
                  <span>歌单推荐</span>
                  <span>{firstGd.title}</span>
                </div>
                <div>
                  <img alt={firstGd.title} src={firstGd.cover} />
                </div>
              </div>
              <div>
                <div>
                  <span>新歌首发</span>
                  <span>{`${firstSong.name} - ${this.formatSinger.call(
                    null,
                    firstSong.singer
                  )}`}</span>
                </div>
                <div>
                  <img
                    alt={firstSong.name}
                    src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${
                      firstSong.album.mid
                    }.jpg?max_age=2592000`}
                  />
                </div>
              </div>
            </div>
          </GxdtWrapper>
          <div>
            <TitleWrapper >
              <span>为你推荐歌单</span>
              <Icon  onClick={this.enterRoute.bind(null, 'flgds')} className="icon-jiantouyou" />
            </TitleWrapper>
            <WntjgdWrapper>
              {_.map(gds, (group, idx) => (
                <div key={idx}>
                  {_.map(group, (item, iidx) => {
                    return (
                      <div key={iidx}  onClick={this.enterRoute.bind(null, 'flgds/'+item.content_id)}>
                        <div>
                          <img alt={item.username} src={item.cover} />
                          <div>
                            <div>
                              <Icon className="icon-erji" />
                              <span>{`${(item.listen_num / 1000) | 0}万`}</span>
                            </div>
                            <div>
                              <Icon className="icon-icon-12" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <span>{item.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </WntjgdWrapper>
            <ChangeWrapper>
              <div onClick={this.randomGds}>
                <Icon className="icon-shuaxin" />
                <span>换一批</span>
              </div>
            </ChangeWrapper>
          </div>
          <div>
            <TitleWrapper>
              <span>新歌首发</span>
              <Icon className="icon-jiantouyou" />
            </TitleWrapper>
            <XgsfWrapper>
              <Songs img songs={songs} />
            </XgsfWrapper>
            <ChangeWrapper>
              <div onClick={this.randomSongs}>
                <Icon className="icon-shuaxin" />
                <span>换一批</span>
              </div>
            </ChangeWrapper>
          </div>
        </Scroll>
        <RouteWrapper>
          <TransitionRoute path={`${match.url}/singers`} component={Singers} />
          <TransitionRoute path={`${match.url}/ranks`} component={Ranks} />
          <TransitionRoute path={`${match.url}/flgds`} component={Flgds} />
          <TransitionRoute path={`${match.url}/album/:id`} component={Album} />
        </RouteWrapper>
      </Wrapper>
    );
  }
}

const mstp = ({ persist }) => {
  return {
    musicu: persist.musicu
  };
};

const mdtp = (dispatch) => {
  return {
    onGetMusicuAsync: () => {
      dispatch(getMusicuAsync());
    }
  };
};
export default connect(mstp, mdtp)(MusicuContainer);
