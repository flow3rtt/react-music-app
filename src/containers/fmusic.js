import React from 'react';
import styled from 'styled-components';
import { full, flexCenter } from '../assets/style/const';

const Wrapper = styled.div`
  position: absolute;
  ${full};
  ${flexCenter};
  overflow: hidden;
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
          <p>暂未找到Api接口~</p>
        </div>
      </Wrapper>
    );
  }
}
export default FmusicContainer;
