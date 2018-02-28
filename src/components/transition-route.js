import React from 'react';
import { withRouter } from 'react-router-dom';
import { VelocityTransitionGroup } from 'velocity-react';

class TransitionRoute extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      duration: 300
    };
  }
  clearTransform = ([el]) => {
    el.style.transform = '';
  };
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname; //只用url变化了才render,避免父组件render的影响
  }
  render() {
    let { path, component: Component, location, match } = this.props;
    const { duration } = this.state;
    const { pathname } = location;
    let check = false;
    let index = path.indexOf(':');
    if (index !== -1) {
      let l = path.substring(0, index-1);
      let r = pathname.substring(0, pathname.lastIndexOf('/'));
      check = l === r;
    } else {
      check = pathname.indexOf(path) !== -1;
    }
    return (
      <VelocityTransitionGroup
        component={'div'}
        enter={{
          animation: {
            translateX: '0%'
          },
          style: {
            translateX: '100%'
          },
          duration,
          complete: this.clearTransform
        }}
        leave={{
          animation: {
            translateX: '100%'
          },
          duration
        }}
      >
        {check ? <Component match={match} location={location} /> : null}
      </VelocityTransitionGroup>
    );
  }
}
export default withRouter(TransitionRoute);
