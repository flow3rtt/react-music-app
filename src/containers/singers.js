import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getSingersAsync } from '../store/reducers/persist';
import _ from 'lodash';
import history from '../history';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import * as vars from '../assets/style/var';
import { createSelector } from 'reselect';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import { full } from '../assets/style/const';
import TransitionRoute from '../components/transition-route';

import Singer from './singer';
const RouteWrapper = styled.div`
  > div {
    > div {
      position: fixed;
      ${full};
      bottom:5rem;
      z-index: 9;
    }
  }
`;

const Wrapper = styled.div`
  background-color: ${vars.backgroundColor};
  position: relative;
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
const FixedIndexs = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  padding: 1rem;
  align-items: center;
  right: 0;
  width: 1.2rem;
  justify-content: center;
  > ul {
    background-color: #f0f0f0;
    padding: 1rem 0.2rem;
    text-align: center;
    border-radius: 0.8rem;
    > li {
      padding: 0.2rem 0;
      > span {
        font-size: 1rem;
        color: ${vars.fontColorTwo};
        &.active {
          font-size: 1.1rem;
          color: ${vars.themeColor};
        }
      }
    }
  }
`;
const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const FixedTitle = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  height: 2rem;
  display: flex;
  padding: 1rem;
  align-items: center;
  left: 0;
  right: 0;
  background-color: #f0f0f0;
  > span {
    color: ${vars.fontColorTwo};
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  > div:first-child {
    height: 2rem;
    display: flex;
    padding: 1rem;
    align-items: center;
    background-color: #f0f0f0;
    > span {
      color: ${vars.fontColorTwo};
    }
  }
  > div:last-child {
    padding: 1rem 0.8rem;
    > div {
      display: flex;
      padding: 0.8rem 0;
      > div:first-child {
        padding-right: 0.6rem;
        > img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
        }
      }
      > div:last-child {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 0.8rem;
        justify-content: space-between;
        border-bottom: ${vars.border};
        span {
          font-size: 1.2rem;
          font-weight: 520;
        }
        i {
          color: ${vars.fontColorTwo};
          font-size: 1.4rem;
        }
      }
    }
  }
`;

class Singers extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.domHeight = [];
  }
  componentDidMount() {
    const { singers, onGetSingersAsync } = this.props;
    if (_.isEmpty(singers)) {
      onGetSingersAsync();
    } else {
      this.calcDomHeight();
    }
  }
  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps['singers']) && !_.isEmpty(this.props['singers'])) {
      this.calcDomHeight();
    }
  }
  goBack = () => {
    history.push('/musicu')
  };
  calcDomHeight = () => {
    setTimeout(() => {
      let dom = findDOMNode(this.scrollCmp).children[0];
      if (!dom) {
        return;
      }
      let h = 0;
      this.domHeight.push(h);
      _.forEach(dom.children, (child) => {
        let th = child.clientHeight;
        h += th;
        this.domHeight.push(h);
      });
    }, 20);
  };
  indexsClick = (idx) => {
    let dom = findDOMNode(this.scrollCmp).children[0];
    if (!dom) {
      return;
    }
    this.scrollCmp.scrollToElement(dom.children[idx], 300);
  };
  handleScroll = (pos) => {
    let y = -pos.y;
    if (_.isEmpty(this.domHeight)) {
      return;
    }
    let { index } = this.state;
    if (y < 0) {
      if (index !== 0) {
        this.setState({
          index: 0
        });
      }
      return;
    }
    for (let idx = 0; idx < this.domHeight.length - 1; idx++) {
      const h = this.domHeight[idx];
      const nh = this.domHeight[idx + 1];
      if (y >= h && y < nh) {
        if (index !== idx) {
          this.setState({
            index: idx
          });
        }
      }
    }
  };
  selectItem = (item) => {
    const { match } = this.props;
    history.push({
      pathname: `${match.url}/singers/${item['Fsinger_mid']}`,
      search:`name=${item['Fsinger_name']}`
    });
  };
  render() {
    const { singers, indexs,match } = this.props;
    const { index } = this.state;

    let fixedTitle = '';
    if (index >= 0 && _.size(indexs) - 1 >= index) {
      fixedTitle = indexs[index];
    }
    return (
      <Wrapper>
        <TitleWrapper>
          <div onClick={this.goBack}>
            <Icon className="icon-jiantou" />
          </div>
          <div>
            <span>歌手</span>
          </div>
          <div>
            <Icon className="icon-icon-8" />
          </div>
        </TitleWrapper>
        {!_.isEmpty(singers) ? (
          <React.Fragment>
            {index >= 1 ? (
              <FixedIndexs>
                <ul>
                  {_.map(indexs, (t, idx) => (
                    <li key={idx} onClick={this.indexsClick.bind(null, idx)}>
                      <span className={cx({ active: idx === index })}>{t}</span>
                    </li>
                  ))}
                </ul>
              </FixedIndexs>
            ) : null}
            <ContentWrapper>
              {!!fixedTitle && index >= 1 ? (
                <FixedTitle>
                  <span>{fixedTitle}</span>
                </FixedTitle>
              ) : null}
              <Scroll
                probeType={3}
                onScroll={this.handleScroll}
                ref={(cmp) => (this.scrollCmp = cmp)}
              >
                {_.map(singers, (group, idx) => (
                  <Group key={idx}>
                    <div>
                      <span>{group.title}</span>
                    </div>
                    <div>
                      {_.map(group.items, (singer, idxs) => (
                        <div key={idxs} onClick={this.selectItem.bind(null,singer)}>
                          <div>
                            <img
                              alt={singer.Fsinger_name}
                              src={`https://y.gtimg.cn/music/photo_new/T001R150x150M000${
                                singer.Fsinger_mid
                              }.jpg?max_age=2592000`}
                            />
                          </div>
                          <div>
                            <div>
                              <span>{singer.Fsinger_name}</span>
                            </div>
                            <div>
                              <Icon className="icon-jiantouyou" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Group>
                ))}
              </Scroll>
              <RouteWrapper>
              <TransitionRoute
                path={`${match.url}/singers/:id`}
                component={Singer}
              />
            </RouteWrapper>
            </ContentWrapper>
          </React.Fragment>
        ) : null}
      </Wrapper>
    );
  }
}

const getIndexs = createSelector(
  (persist) => persist.singers,
  (singers) => _.map(singers, (singer) => singer.title)
);

const mstp = ({ persist }) => {
  return {
    singers: persist.singers,
    indexs: getIndexs(persist)
  };
};

const mdtp = (dispatch) => {
  return {
    onGetSingersAsync: () => {
      dispatch(getSingersAsync());
    }
  };
};
export default connect(mstp, mdtp)(Singers);
