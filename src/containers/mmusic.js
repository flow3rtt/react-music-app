import React from "react";
import styled from "styled-components";
import { full, flexCenter } from "../assets/style/const";
import { border, themeColor } from "../assets/style/var";
import Icon from "../components/icon";
const Wrapper = styled.div`
  position: absolute;
  ${full};
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  // border-bottom:${border};
  > div:first-child {
    width: 100%;
    text-align: center;
    height: 4rem;
    line-height: 4rem;
    > img {
      display: inline-block;
      height: 100%;
      border-radius: 50%;
    }
    > span {
      vertical-align: top;
      padding-left: 0.6rem;
      font-size:1.4rem;
    }
  }
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-around;
    > div {
      margin-top:1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      > span:first-child {
        font-size: 1.2rem;
      }
      > span:last-child {
        padding-top: 0.4rem;
        font-size: 1rem;
        color: #c0c0c0;
      }
    }
  }
`;
const Middle = styled.div`
  margin: 2rem 0;
  display: inline-block;
  width: 100%;
  > div:last-child {
    margin-top: 1rem;
  }
  > div {
    display: flex;
    align-items: center;
    > div {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      > *:not(:last-child) {
        padding-bottom: 0.24rem;
      }
      > i {
        font-size: 2.4rem;
        color: ${themeColor};
      }
      > span {
        font-size: 1.2rem;
      }
      > span:last-child {
        font-size: 1rem;
        color: #c0c0c0;
      }
    }
  }
`;
const Bottom = styled.div`
  ${flexCenter};
  margin: 3rem 0;
  p {
    margin: 0.2rem 0;
    text-align: center;
    color: ${themeColor};
    font-family: 隶书;
    font-size: 1.4rem;
  }
`;

const middleData = [
  [
    {
      top: <Icon className={"icon-yinle"} />,
      middle: <span>本地音乐</span>,
      bottom: <span>8</span>
    },
    {
      top: <Icon className={"icon-xiazai"} />,
      middle: <span>下载音乐</span>,
      bottom: <span>2</span>
    },
    {
      top: <Icon className={"icon-3lishi"} />,
      middle: <span>最近播放</span>,
      bottom: <span>200</span>
    }
  ],
  [
    {
      top: <Icon className={"icon-love"} />,
      middle: <span>我喜欢</span>,
      bottom: <span>16</span>
    },
    {
      top: <Icon className={"icon-icon-1"} />,
      middle: <span>已购音乐</span>,
      bottom: <span />
    },
    {
      top: <Icon className={"icon-shouyinji"} />,
      middle: <span>跑步音乐</span>,
      bottom: <span>QQ音乐 x Nike</span>
    }
  ]
];

class MmusicContainer extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {} = this.props;
    const {} = this.state;
    return (
      <Wrapper>
        <Top>
          <div>
            <img src={require('../assets/img/head.jpg')} alt="" />
            <span>xing.</span>
          </div>
          <div>
            <div>
              <span>任务中心</span>
              <span>今日听歌4小时</span>
            </div>
            <div>
              <span>会员中心</span>
              <span>千万专属曲库任性享</span>
            </div>
          </div>
        </Top>
        <Middle>
          {middleData.map((g, gi) => (
            <div key={gi}>
              {g.map((v, i) => (
                <div key={i}>
                  {v.top}
                  {v.middle}
                  {v.bottom}
                </div>
              ))}
            </div>
          ))}
        </Middle>
        <Bottom>
          <div>
            <p>x96</p>
            <p>QQ: 220360449</p>
            <p>Email: x96121@gmail.com</p>
          </div>
        </Bottom>
      </Wrapper>
    );
  }
}
export default MmusicContainer;
