import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.i`
`;
class Icon extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {className,children,...rest} = this.props;
    const {} = this.state;
    className=`iconfont ${className}`
    return <Wrapper className={className} {...rest}>{children}</Wrapper>;
  }
}
export default Icon;
