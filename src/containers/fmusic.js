import React from "react";
import styled from "styled-components";
import { full, flexCenter } from "../assets/style/const";

const Wrapper = styled.div`
  position: absolute;
  ${full};
  ${flexCenter};
  overflow: hidden;
  background-color: white;
  > img {
    height: 100%;
    width: 100%;
  }
`;
class FmusicContainer extends React.Component {
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
        <div>
          <img src={require('../assets/img/fx.gif')} alt="" />
        </div>
      </Wrapper>
    );
  }
}
export default FmusicContainer;
