import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Icon from '../components/icon';
import { selectSong } from '../store/reducers/play';
import { connect } from 'react-redux';
import { fontColorTwo } from '../assets/style/var';
import { hiddenFont } from '../assets/style/const';
import cx from 'classnames';
import * as vars from '../assets/style/var';
const Wrapper = styled.div`
  > div:first-child {
    padding-top: 0.8rem;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    padding-top: 0;
    .img {
      max-height: 100%;
      margin-right: 1rem;
      > img {
        width: 60px;
        height: 60px;
      }
    }
    .index {
      margin: 0.4rem;
      margin-right: 1.6rem;
      > span {
        color: ${fontColorTwo};
        font-size: 1.4rem;
        &.active {
          color: red;
        }
      }
    }
    > div:last-child {
      display: flex;
      height: 60px;
      flex: 1;
      align-items: center;
      border-bottom: ${vars.border};
      > div:first-child {
        display: flex;
        flex-direction: column;
        margin-right: auto;
        > span {
          ${hiddenFont(200)};
        }
        > span:first-child {
          font-weight: 400;
          font-size: 1.25rem;
          padding-bottom: 0.8rem;
        }
        > span:last-child {
          font-size: 1rem;
          color: ${fontColorTwo};
        }
      }
      > div:last-child {
        > i {
          font-size: 1.6rem;
          color: ${fontColorTwo};
        }
      }
    }
  }
`;
const ImgWrapper = styled.div`
  max-height: 100%;
  margin-right: 1rem;
  > img {
    height: 60px;
    width: 60px;
  }
`;
const IndexWrapper = styled.div`
  margin: 0.4rem;
  margin-right: 1.6rem;
  > span {
    color: ${fontColorTwo};
    font-size: 1.4rem;
    &.active {
      color: red;
    }
  }
`;

class Songs extends React.Component {
  static defaultProps = {
    img: false,
    index: false
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.count = 0;
  }
  formatSinger = (singers) => {
    return _.map(singers, (singer) => singer.name).join('/');
  };
  select = (item, idx) => {
    //模拟单击双击
    ++this.count;
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      if (this.count === 2) {
        this.selectAll(idx);
      } else {
        this.selectItem(item);
      }
      this.count = 0;
    }, 200);
  };
  selectItem = (item) => {
    const { onSelectSong } = this.props;
    let list = [item];
    onSelectSong({
      list,
      index: 0
    });
  };
  selectAll = (idx) => {
    const { onSelectSong, songs } = this.props;
    let list = songs;
    onSelectSong({
      list,
      index: idx
    });
  };
  render() {
    const { songs, img, index } = this.props;
    const {} = this.state;
    return (
      <Wrapper>
        {_.map(songs, (song, idx) => (
          <div key={idx} onClick={this.select.bind(null, song, idx)}>
            {!!img ? (
              <ImgWrapper>
                <img
                  alt={song.songname}
                  src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${
                    song.albummid
                  }.jpg?max_age=2592000`}
                />
              </ImgWrapper>
            ) : null}
            {!!index ? (
              <IndexWrapper>
                <span
                  className={cx({
                    active: idx <= 2
                  })}
                >
                  {idx + 1}
                </span>
              </IndexWrapper>
            ) : null}
            <div>
              <div>
                <span>{song.songname}</span>
                <span>{`${this.formatSinger.call(null, song.singer)} - ${
                  song.albumname
                }`}</span>
              </div>
              <div>
                {!!song.vid ? <Icon className="icon-MV" /> : null}
                <Icon className="icon-gengduo2" />
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    );
  }
}
const mstp = (state) => ({});
const mdtp = (dispatch) => ({
  onSelectSong: (payload) => {
    dispatch(selectSong(payload));
  }
});
export default connect(mstp, mdtp)(Songs);
