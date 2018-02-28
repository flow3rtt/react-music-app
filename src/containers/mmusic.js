import React from 'react';
import styled from 'styled-components';
import { full, flexCenter } from '../assets/style/const';
const Wrapper = styled.div`
  position: absolute;
  ${full};
  ${flexCenter};
  overflow: hidden;
  > div {
    > p {
      text-align: center;
      margin-bottom: 0.6rem;
    }
  }
`;
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
        <div>
          <p>x96</p>
          <p>17年毕业的小前端一枚</p>
          <p>email: x96121@gmail.com</p>
        </div>
      </Wrapper>
    );
  }
}
export default MmusicContainer;
