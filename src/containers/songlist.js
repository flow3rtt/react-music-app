import React from 'react';
import styled from 'styled-components';
import { Drawer, Modal } from 'antd-mobile';
import * as vars from '../assets/style/var';
import Icon from '../components/icon';
import Scroll from '../components/scroll';
import {
  selectSong,
  setMode,
  toggleScreen,
  setIng,
  setSong
} from '../store/reducers/play';
import cx from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import { hiddenFont } from '../assets/style/const';
const alert = Modal.alert;

const Wrapper = styled.div`
  .am-drawer {
    position: fixed;
    z-index: -2;
    top: unset;
    &.am-drawer-open {
      z-index: 10;
      top: 0;
    }
    .am-drawer-sidebar {
      height: 60%;
      background-color: ${vars.backgroundColor};
    }
  }
`;
const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const TopWrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  border-bottom: ${vars.border};
  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      padding-left: 0.6rem;
      font-size: 1.4rem;
    }
    > i {
      font-size: 2.4rem;
    }
  }
  > div:last-child {
    > i {
      padding: 0 0.6rem;
      font-size: 1.6rem;
      color: ${vars.fontColorTwo};
    }
  }
`;
const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;
const ItemWrapper = styled.div`
  display: flex;
  padding: 0.8rem 1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${vars.border};
  >div{
    ${hiddenFont(250)}
  }
  > div.active {
    > span {
      color: ${vars.themeColor};
    }
  }
  > div:last-child {
    > i {
      font-size: 1.6rem;
      padding: 0 0.4rem;
      color: ${vars.fontColorTwo};
    }
  }
`;
const BottomWrapper = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${vars.border};
`;
class SongList extends React.Component {
  static defaultProps = {
    open: false
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.count = 0;
  }
  drawerOpenChange = (bool) => {
    const { onChangeDrawerOpen } = this.props;
    onChangeDrawerOpen(bool);
  };
  formatSinger = (singers) => {
    return _.map(singers, (singer) => singer.name).join('/');
  };
  selectItem = (item) => {
    const { onSelectSong } = this.props;
    let list = [item];
    onSelectSong({
      list,
      index: 0
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
  delete = (idx) => {
    const { list, index, onDeleteSong } = this.props;
    let newList = _.slice(list, 0, idx).concat(_.slice(list, idx + 1));
    let newIndex = index;
    if (list.length === 1) {
      this.empty();
      return;
    }
    if (idx < index) {
      newIndex -= 1;
    }
    onDeleteSong({
      list: newList,
      index: newIndex
    });
  };
  emptyAlert = () => {
    const { list } = this.props;
    if (_.isEmpty(list)) {
      return;
    }
    alert('提示', '确定清空所有歌曲', [
      { text: '取消', onPress: () => {} },
      { text: '确定', onPress: this.empty, style: { color: 'red' } }
    ]);
  };
  empty = () => {
    const { onDeleteSong, fullScreen, onToggleScreen, onSetIng } = this.props;
    if (fullScreen) {
      onToggleScreen();
    }
    onSetIng(false);
    onDeleteSong({
      list: [],
      index: -1
    });
  };
  render() {
    const { open, mode, list, index } = this.props;
    const {} = this.state;
    let modeIcon = '';
    let modeText = '';
    if (mode === 0) {
      modeIcon = 'icon-icon-7';
      modeText = '循环播放';
    } else if (mode === 1) {
      modeIcon = 'icon-icon-6';
      modeText = '单曲循环';
    } else {
      modeIcon = 'icon-icon-9';
      modeText = '随机播放';
    }
    const drawerSidebar = (
      <SidebarWrapper>
        <TopWrapper>
          <div>
            <Icon onClick={this.changeMode} className={modeIcon} />
            <span>{`${modeText}(${list.length})`}</span>
          </div>
          <div>
            <Icon className={'icon-xiazai'} />
            <Icon className={'icon-jia'} />
            <Icon onClick={this.emptyAlert} className={'icon-weibiaoti544'} />
          </div>
        </TopWrapper>
        <ContentWrapper>
          <Scroll>
            {_.map(list, (song, idx) => (
              <ItemWrapper key={idx}>
                <div
                  onClick={this.selectItem.bind(null, song)}
                  className={cx({
                    active: index === idx
                  })}
                >
                  <span>{song.songname}</span>
                  <span>{` - ${this.formatSinger.call(
                    null,
                    song.singer
                  )}`}</span>
                </div>
                <div>
                  <Icon className={'icon-love'} />
                  <Icon
                    onClick={this.delete.bind(null, idx)}
                    className={'icon-guanbi'}
                  />
                </div>
              </ItemWrapper>
            ))}
          </Scroll>
        </ContentWrapper>
        <BottomWrapper onClick={this.drawerOpenChange.bind(null, false)}>
          <div>
            <span>关闭</span>
          </div>
        </BottomWrapper>
      </SidebarWrapper>
    );
    return (
      <Wrapper>
        <Drawer
          sidebar={drawerSidebar}
          open={open}
          position={'bottom'}
          onOpenChange={this.drawerOpenChange}
        >
          <span />
        </Drawer>
      </Wrapper>
    );
  }
}

const mstp = ({ play }) => {
  return {
    ...play
  };
};

const mdtp = (dispatch) => ({
  onSelectSong: (payload) => {
    dispatch(selectSong(payload));
  },
  onDeleteSong: (payload) => {
    dispatch(setSong(payload));
  },
  onToggleScreen: () => {
    dispatch(toggleScreen());
  },
  onSetIng: (ing) => {
    dispatch(setIng(ing));
  },
  onSetMode: (mode) => {
    dispatch(setMode(mode));
  }
});
export default connect(mstp, mdtp)(SongList);
