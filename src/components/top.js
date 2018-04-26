import React from "react";
import styled from "styled-components";
import * as vars from "../assets/style/var";
import { NavLink } from "react-router-dom";
import { Popover, Toast, Drawer, Switch } from "antd-mobile";
import Icon from "./icon";
import history from "../history";
const { Item: PopoverItem } = Popover;
const popoverIconStyle = {
  fontSize: "2rem",
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
const SidebarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 1.6rem;
  > div:first-child {
    flex: 1;
    > div {
      margin: 4rem 0;
      display: flex;
      flex-direction: column;
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.2rem;
        *:first-child {
          font-size: 1.24rem;
        }
        *:last-child {
          font-size: 1rem;
        }
        span:last-of-type:not(:first-child) {
          color: #c0c0c0;
        }
        .am-switch {
          transform: scale(0.8);
        }
      }
    }
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.4rem;
    border-top: ${vars.border};
    > div {
      display: flex;
      align-items: center;
      > i {
        color: ${vars.themeColor};
      }
      > span {
        font-size: 1rem;
        padding-left: 0.4rem;
      }
    }
    > div:last-child {
      > i {
        transform: rotate(180deg);
        font-size: 2rem;
      }
    }
  }
`;

const sidebarData = [
  [
    {
      left: <span>个性装扮</span>,
      right: <span>默认套装</span>
    },
    {
      left: <span>消息中心</span>,
      right: <span />
    },
    {
      left: <span>免流量服务</span>,
      right: <span>王卡听歌免流量</span>
    }
  ],
  [
    {
      left: <span>定时关闭</span>,
      right: <span />
    },
    {
      left: <span>仅WIFI联网</span>,
      right: <Switch />
    },
    {
      left: <span>流量提醒</span>,
      right: <Switch />
    },
    {
      left: <span>听歌偏好</span>,
      right: <Switch />
    }
  ],
  [
    {
      left: <span>微云音乐网盘</span>,
      right: <span />
    },
    {
      left: <span>导入外部歌单</span>,
      right: <span />
    },
    {
      left: <span>清理空间</span>,
      right: <span />
    },
    {
      left: <span>帮助与反馈</span>,
      right: <span />
    },
    {
      left: <span>关于QQ音乐</span>,
      right: <span />
    }
  ]
];
class Top extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      popovervisible: false,
      drawerOpen: false
    };
  }
  popoverVisibleChange = bool => {
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
  drawerOpenChange = bool => {
    this.setState({
      drawerOpen: bool
    });
  };
  enterSearch = () => {
    history.push("/search");
  };
  render() {
    const {} = this.props;
    const { popovervisible, drawerOpen } = this.state;
    const drawerSidebar = (
      <SidebarWrapper>
        <div>
          {sidebarData.map((group, gi) => (
            <div key={gi}>
              {group.map((v, i) => (
                <div key={i}>
                  {v.left}
                  {v.right}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div>
            <Icon className={"icon-shezhi"} />
            <span>设置</span>
          </div>
          <div>
            <Icon className={"icon-tuichu6"} />
            <span>退出登录/关闭</span>
          </div>
        </div>
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
