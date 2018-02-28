import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { VelocityTransitionGroup } from 'velocity-react';
import Mmusic from '../containers/mmusic';
import Musicu from '../containers/musicu';
import Fmusic from '../containers/fmusic';
import Search from '../containers/search';
import _ from 'lodash';
const Wrapper = styled.div`
  flex: 1;
  > div {
    height: 100%;
    position: relative;
    > div {

    }
  }
`;

const routes = [
  {
    path: '/mmusic',
    component: Mmusic
  },
  {
    path: '/musicu',
    component: Musicu
  },
  {
    path: '/fmusic',
    component: Fmusic
  },

];

class MiddleLayout extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      duration: 300
    };
    this.prevRouteIndex = -1;
  }
  clearTransform = ([el]) => {
    el.style.transform = '';
  };
  render() {
    const { duration } = this.state;
    const {} = this.props;
    return (
      <Wrapper>
        <Route
          path="/:path"
          children={(props) => {
            const { location, match } = props;
            if (!match) {
              return <Redirect to="/musicu" />;
            }
            const { path } = match.params;
            const { pathname } = location;
            let index = _.map(routes, (route) => route.path).indexOf(
              `/${path}`
            );
            if (index === -1 && path!=='search' ) {
              return <Redirect to="/musicu" />;
            } else if(path==='search'){
              return <Route path={`/${path}`} component={Search} />;
            }
            let direction = index > this.prevRouteIndex ? 'right' : 'left';
            this.prevRouteIndex = index;
            return (
              <VelocityTransitionGroup
                component={'div'}
                enter={{
                  animation: {
                    translateX: '0%',
                    opacity: 1
                  },
                  style: {
                    translateX: direction === 'right' ? '100%' : '-100%',
                    opacity: 0
                  },
                  duration,
                  complete: this.clearTransform
                }}
                leave={{
                  animation: {
                    translateX: direction !== 'right' ? '100%' : '-100%',
                    opacity: 0
                  },
                  duration
                }}
              >
                {_.map(routes, (route) => {
                  return pathname.indexOf(route.path) !== -1 ? (
                    <route.component key={route.path} match={match} />
                  ) : null;
                })}
              </VelocityTransitionGroup>
            );
          }}
        />
      </Wrapper>
    );
  }
}

export default MiddleLayout;
