import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getRanksAsync,getRankMapAsync } from '../store/reducers/persist';
import _ from 'lodash';
import history from '../history';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import * as vars from '../assets/style/var';
import { hiddenFont, full } from '../assets/style/const';
import TransitionRoute from '../components/transition-route';
import Rank from './rank';

const RouteWrapper = styled.div`
  > div {
    > div {
      position: absolute;
      ${full};
      z-index:9;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${vars.backgroundColor};
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
`;
const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;
const QqyydfbWrapper = styled.div`
  > div:first-child {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    > span {
      font-size: 1.25rem;
      font-weight: 520;
    }
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      padding: 0.5rem 1rem;
      > div:first-child {
        > img {
          height: 80px;
          width: 80px;
        }
      }
      > div:last-child {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        justify-content: space-between;
        > div:first-child {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          > div {
            ${hiddenFont(200)} > span {
              font-size: 1rem;
            }
            > span:first-child {
              font-weight: 600;
            }
            > span:last-child {
              color: ${vars.fontColorTwo};
            }
          }
        }
        i {
          color: ${vars.fontColorTwo};
        }
      }
    }
  }
`;
const QqbfbWrapper = styled.div`
  > div:first-child {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    > span {
      font-size: 1.25rem;
      font-weight: 520;
    }
  }
  > div:last-child {
    > div {
      display: flex;
      min-height: calc(33vw + 3rem);
      > div {
        flex: 1;
        padding-bottom: 0.6rem;
        > div {
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
                color: ${vars.fontColor};
              }
              > i {
                color: black;
                font-size: 1.4rem;
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
        > span {
          font-size: 1rem;
        }
      }
      > div:nth-child(2) {
        margin: 0 0.2rem;
      }
    }
  }
`;

class Ranks extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { ranks, onGetRanksAsync } = this.props;
    if (_.isEmpty(ranks)) {
      onGetRanksAsync();
    }
  }
  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps['ranks']) && !_.isEmpty(this.props['ranks'])) {
    }
  }
  goBack = () => {
    history.goBack();
  };
  selectItem = (type, item) => {
    const { match,rankMap,onGetRankMapAsync} = this.props;
    item['id'] = item.topID;
    item['date'] = item.update_key;
    item['type'] = type;
    if(!rankMap[item['id']]){
      onGetRankMapAsync(item)
    }
    history.push({
      pathname:`${match.url}/ranks/${item['id']}`,
    });
  };
  render() {
    const { ranks, match } = this.props;
    let qqyydfbs = [];
    let qqbs = [];
    if (!_.isEmpty(ranks) && _.size(ranks) >= 2) {
      qqyydfbs = ranks[0].List;
      qqbs = _.chunk(ranks[1].List, 3);
    }
    return (
      <Wrapper>
        <TitleWrapper>
          <div onClick={this.goBack}>
            <Icon className="icon-jiantou" />
          </div>
          <div>
            <span>排行</span>
          </div>
        </TitleWrapper>
        {!_.isEmpty(ranks) ? (
          <ContentWrapper>
            <Scroll>
              <QqyydfbWrapper>
                <div>
                  <span>QQ音乐巅峰榜</span>
                </div>
                <div>
                  {_.map(qqyydfbs, (item, idx) => {
                    if (item.topID === 201) {
                      return null;
                    } else {
                      return (
                        <div
                          key={idx}
                          onClick={this.selectItem.bind(null, 'top', item)}
                        >
                          <div>
                            <img alt={item.ListName} src={item.pic} />
                          </div>
                          <div>
                            <div>
                              {_.map(item.songlist, (song, idxs) => {
                                if (idxs >= 3) {
                                  return null;
                                } else {
                                  return (
                                    <div key={idxs}>
                                      <span>{` ${idxs + 1} ${
                                        song.songname
                                      } - `}</span>
                                      <span>{`${song.singername}`}</span>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                            <div>
                              <Icon className="icon-jiantouyou" />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </QqyydfbWrapper>
              <QqbfbWrapper>
                <div>
                  <span>全球榜</span>
                </div>
                <div>
                  {_.map(qqbs, (group, idx) => (
                    <div key={idx}>
                      {_.map(group, (item, idxi) => (
                        <div
                          key={idxi}
                          onClick={this.selectItem.bind(null, 'global', item)}
                        >
                          <div>
                            <img alt={item.ListName} src={item.pic} />
                            <div>
                              <div>
                                <Icon className="icon-erji" />
                                <span>{`${(item.listennum / 10000) |
                                  0}万`}</span>
                              </div>
                              <div>
                                <Icon className="icon-icon-12" />
                              </div>
                            </div>
                          </div>
                          <span>{item.ListName}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </QqbfbWrapper>
            </Scroll>
          </ContentWrapper>
        ) : null}
        <RouteWrapper>
          <TransitionRoute path={`${match.url}/ranks/:id`} component={Rank} />
        </RouteWrapper>
      </Wrapper>
    );
  }
}

const mstp = ({ persist }) => {
  return {
    ranks: persist.ranks,
    rankMap: persist.rankMap
  };
};

const mdtp = (dispatch) => {
  return {
    onGetRanksAsync: () => {
      dispatch(getRanksAsync());
    },
    onGetRankMapAsync: (item) => {
      dispatch(getRankMapAsync(item));
    }
  };
};
export default connect(mstp, mdtp)(Ranks);
