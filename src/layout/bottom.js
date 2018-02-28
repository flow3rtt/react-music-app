import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Player from '../containers/player';
const Wrapper = styled.div`
  height: 5rem;
  background-color: white;
  z-index: 9;
`;

class BottomLayout extends React.Component {
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
        <Player />
      </Wrapper>
    );
  }
}

export default BottomLayout;
