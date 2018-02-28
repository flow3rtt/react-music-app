import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getFlgdsAsync } from '../store/reducers/persist';
import _ from 'lodash';
import history from '../history';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import * as vars from '../assets/style/var';
import { createSelector } from 'reselect';
import TransitionRoute from '../components/transition-route';
import Flgd from './flgd';
import { full } from '../assets/style/const';

const RouteWrapper = styled.div`
  > div {
    > div {
      position: absolute;
      ${full};
      z-index: 9;
    }
  }
`;

const Wrapper = styled.div`
  background-color: ${vars.backgroundColor};
  display: flex;
  flex-direction: column;
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

const GdsWrapper = styled.div`
  > div:first-child {
    width: 100%;
    padding: 1rem;
    > span {
      font-size: 1.25rem;
      font-weight: 520;
    }
  }
  > div:last-child {
    > div {
      display: flex;
      min-height: calc(50vw + 5rem); //解决scroll无法滚动到底~
      > div {
        flex: 1;
        padding-bottom: 0.6rem;
        display: flex;
        flex-direction: column;
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
        > span:nth-child(2) {
          height: 2rem;
        }
        > span:last-child {
          padding-top: 0.4rem;
          color: ${vars.fontColorTwo};
        }
      }
      > div:nth-child(2) {
        margin: 0 0.2rem;
      }
    }
  }
`;

class Flgds extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { flgds, onGetFlgdsAsync } = this.props;
    if (_.isEmpty(flgds)) {
      onGetFlgdsAsync();
    }
  }
  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps['flgds']) && !_.isEmpty(this.props['flgds'])) {
    }
  }
  goBack = () => {
    history.goBack();
  };
  selectItem = (item) => {
    const { match } = this.props;
    history.push({
      pathname: `${match.url}/flgds/${item['dissid']}`
    });
  };
  render() {
    const { flgds, match } = this.props;
    const {} = this.state;
    return (
      <Wrapper>
        <TitleWrapper>
          <div onClick={this.goBack}>
            <Icon className="icon-jiantou" />
          </div>
          <div>
            <span>分类歌单</span>
          </div>
          <div>
            <span>投稿</span>
          </div>
        </TitleWrapper>
        {!_.isEmpty(flgds) ? (
          <ContentWrapper>
            <Scroll>
              <GdsWrapper>
                <div>
                  <span>精选歌单</span>
                </div>
                <div>
                  {_.map(flgds, (group, idx) => (
                    <div key={idx}>
                      {_.map(group, (item, idxi) => (
                        <div
                          key={idxi}
                          onClick={this.selectItem.bind(null, item)}
                        >
                          <div>
                            <img alt={item.dissname} src={item.imgurl} />
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
                          <span>{item.dissname}</span>
                          <span>{item.creator.name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </GdsWrapper>
            </Scroll>
            <RouteWrapper>
              <TransitionRoute
                path={`${match.url}/flgds/:id`}
                component={Flgd}
              />
            </RouteWrapper>
          </ContentWrapper>
        ) : null}
      </Wrapper>
    );
  }
}

const getFlgds = createSelector(
  (persist) => persist.flgds,
  (flgds) => {
    return _.chunk(flgds, 2);
  }
);

const mstp = ({ persist }) => {
  return {
    flgds: getFlgds(persist)
  };
};

const mdtp = (dispatch) => {
  return {
    onGetFlgdsAsync: () => {
      dispatch(getFlgdsAsync());
    }
  };
};
export default connect(mstp, mdtp)(Flgds);
