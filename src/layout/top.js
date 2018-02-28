import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Top from '../components/top';

const Wrapper = styled.div``;

class TopLayout extends React.Component {
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
        <Top />
      </Wrapper>
    );
  }
}

export default TopLayout;
