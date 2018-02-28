import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TopLayout from './top';
import MiddleLayout from './middle';
import BottomLayout from './bottom';

const Wrapper = styled.div`
   display:flex;
   flex-direction:column;
   height:100%;
`;

class App extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const {} = this.props;
    return (
      <Wrapper>
        <TopLayout />
        <MiddleLayout />
        <BottomLayout />
      </Wrapper>
    );
  }
}

export default App;
