import React from 'react';
import styled from 'styled-components';
import * as vars from '../assets/style/var';
import { NavLink } from 'react-router-dom';
import { Popover, Toast, Drawer } from 'antd-mobile';
import Icon from './icon';
import history from '../history';
import { flexCenter } from '../assets/style/const';
const { Item: PopoverItem } = Popover;
const popoverIconStyle = {
  fontSize: '2rem',
  color: vars.themeColor
};

const Wrapper = styled.div`
  height: 6rem;
  background-color: ${vars.themeColor};
  display: flex;
  flex-direction: column;
`;

const LinkWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  padding: 0 0.6rem;
  .am-drawer {
    position: fixed;
    z-index: -1;
    &.am-drawer-open {
      z-index: 10;
    }
    .am-drawer-sidebar {
      width: 85%;
      background-color: white;
    }
  }
  i {
    font-size: 1.6rem;
    color: ${vars.fontColor};
  }
  > div:nth-child(2) {
    > a {
      text-decoration: none;
      color: ${vars.fontColor};
      &.active {
        color: white;
      }
    }
    > a:nth-child(2) {
      padding: 0 1rem;
    }
  }
`;
const SearchWrapper = styled.div`
  margin: 0.6rem;
  color: ${vars.fontColor};
  > div:first-child {
    padding: 0.2rem;
    background-color: #2caf70;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      padding: 0 0.2rem;
    }
  }
`;
const SidebarWrapper= styled.div`
  ${flexCenter};
  height:100%;
`
class Top extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      popovervisible: false,
      drawerOpen: false
    };
  }
  popoverVisibleChange = (bool) => {
    this.setState({
      popovervisible: bool
    });
  };
  popoverSelect = ({ key }) => {
    this.setState(
      {
        popovervisible: false
      },
      () => {
        Toast.offline(`${key}功能未开放~`, 0.5);
      }
    );
  };
  drawerOpenChange = (bool) => {
    this.setState({
      drawerOpen: bool
    });
  };
  enterSearch = () => {
    history.push('/search');
  };
  render() {
    const {} = this.props;
    const { popovervisible, drawerOpen } = this.state;
    const drawerSidebar = (
      <SidebarWrapper>
        <p>未完待续~</p>
      </SidebarWrapper>
    );

    return (
      <Wrapper>
        <LinkWrapper>
          <div>
            <Icon
              className="icon-gengduo"
              onClick={this.drawerOpenChange.bind(null, true)}
            />
            <Drawer
              sidebar={drawerSidebar}
              open={drawerOpen}
              onOpenChange={this.drawerOpenChange}
            >
              <span />
            </Drawer>
          </div>
          <div>
            <NavLink replace to="/mmusic">
              我的
            </NavLink>
            <NavLink replace to="/musicu">
              音乐馆
            </NavLink>
            <NavLink replace to="/fmusic">
              发现
            </NavLink>
          </div>
          <Popover
            mask
            visible={popovervisible}
            overlay={[
              <PopoverItem
                key="扫一扫"
                icon={
                  <Icon style={popoverIconStyle} className="icon-saoyisao" />
                }
              >
                扫一扫
              </PopoverItem>,
              <PopoverItem
                key="听歌识曲"
                icon={
                  <Icon
                    style={popoverIconStyle}
                    className="icon-yinle-yuanshijituantubiao"
                  />
                }
              >
                听歌识曲
              </PopoverItem>
            ]}
            onVisibleChange={this.popoverVisibleChange}
            onSelect={this.popoverSelect}
          >
            <div>
              <Icon className="icon-jia" />
            </div>
          </Popover>
        </LinkWrapper>
        <SearchWrapper>
          <div onClick={this.enterSearch}>
            <Icon className="icon-icon-8" />
            <span>搜索</span>
          </div>
        </SearchWrapper>
      </Wrapper>
    );
  }
}
export default Top;
