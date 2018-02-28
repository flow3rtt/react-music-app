import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import history from '../history';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as vars from '../assets/style/var';
import Songs from './songs';
import { findDOMNode } from 'react-dom';
import { full } from '../assets/style/const';
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
      font-size: 1.4rem;
      font-weight: 520;
      color: white;
    }
  }
  > div:last-child {
    padding: 0.8rem 0;
    > span {
      font-size: 1rem;
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

class Rank extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    history.goBack();
  };
  handleScroll = (pos) => {
    const { info} = this.props;
    let y = -pos.y;
    let maxY = window.innerWidth*0.7 - 12 * 3;
    y = Math.min(y, maxY);
    this.overlayDom.style['transform'] = `translate3d(0,${-y}px,0)`;
    let scale = 1;
    const formula = Math.abs(-pos.y / window.innerWidth*0.7);
    if (y < 0) {
      scale = 1 + formula;
      this.bgImageDom.style['transform'] = `scale(${scale})`;
    }
    if (-pos.y > 5 * 12) {
      this.infoDom.style['display'] = 'none';
      this.titleDom.innerHTML = info.name;
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
  render() {
    const {} = this.state;
    const { rank, info, songs } = this.props;
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
        {!_.isEmpty(rank) ? (
          <React.Fragment>
            <BgImageWrapper
              style={{
                backgroundImage: `url(${info.imgUrl})`
              }}
              ref={(cmp) => (this.bgImageDom = findDOMNode(cmp))}
            >
              <FilterWrapper />
              <InfoWrapper ref={(cmp) => (this.infoDom = findDOMNode(cmp))}>
                <div>
                  <span>{info.name}</span>
                </div>
                <div>
                  <span>{`${info.time}更新`}</span>
                </div>
              </InfoWrapper>
            </BgImageWrapper>
            <OverlayWrapper
              ref={(cmp) => (this.overlayDom = findDOMNode(cmp))}
            />
            <ContentWrapper ref={(cmp) => (this.contentDom = findDOMNode(cmp))}>
              <Scroll probeType={3} onScroll={this.handleScroll}>
                <Songs songs={songs} index />
              </Scroll>
            </ContentWrapper>
          </React.Fragment>
        ) : null}
      </Wrapper>
    );
  }
}
const getRank = (persist, id) => {
  return persist.rankMap[id] || {};
};
const getSongs = createSelector([getRank], (rank) => {
  if (_.isEmpty(rank)) {
    return [];
  }
  return _.map(rank.songlist, (item) => item.data);
});

const getInfo = createSelector([getRank, getSongs], (rank, songs) => {
  let info = {
    name: '',
    time: '',
    imgUrl: ''
  };
  if (!_.isEmpty(songs)) {
    info.name = rank.ListName;
    info.time = rank.update_time;
    info.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      _.first(songs).albummid
    }.jpg?max_age=2592000`;
  }
  return info;
});

const mstp = ({ persist }) => {
  let pathname = history.location.pathname;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);
  return {
    rank: getRank(persist, id),
    songs: getSongs(persist, id),
    info: getInfo(persist, id)
  };
};

export default connect(mstp)(Rank);
