import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import _ from 'lodash';
const Wrapper = styled.div``;

class Scroll extends React.Component {
  static propTypes = {
    click: PropTypes.bool,
    observeDOM: PropTypes.bool,
    probeType: PropTypes.number,
    onScroll: PropTypes.func,
  };
  static defaultProps = {
    click: true,
    observeDOM: false,
    probeType: 1
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  }

  componentDidUpdate() {
    if(!!this.timer){
      clearTimeout(this.timer)
    }
    this.timer =setTimeout(() => {
      this.refersh();
    }, 20);
  }
  refersh = () => {
    this.scrollObj && this.scrollObj.refresh();
  };
  scrollTo = (...rest) => {
    this.scrollObj && this.scrollObj.scrollTo(...rest);
  };
  scrollToElement = (...rest) => {
    this.scrollObj && this.scrollObj.scrollToElement(...rest);
  };
  initScroll = () => {
    const { click, observeDOM, probeType, onScroll } = this.props;
    if (!this.rootDom) {
      return;
    }
    this.scrollObj = new BScroll(this.rootDom, {
      click,
      observeDOM,
      probeType
    });
    if (!!onScroll) {
      this.scrollObj.on('scroll', (pos) => {
        if (!!this.rootDom) {
          onScroll(pos);
        }
      });
    }
  };

  render() {
    const {} = this.state;
    const { children } = this.props;
    return (
      <div
        ref={(dom) => (this.rootDom = dom)}
        style={{ height: '100%', width: '100%' }}
      >
        <Wrapper>{children}</Wrapper>
      </div>
    );
  }
}

export default Scroll;
