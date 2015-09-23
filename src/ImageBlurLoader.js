import React, { Component, PropTypes } from 'react';
import { transition } from 'moveit';

export default class ImageBlurLoader extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    blur: PropTypes.number,
    style: PropTypes.object,
    animation: PropTypes.object
  }

  static defaultProps = {
    blur: 10,
    animation: {
      keyframes: {
        to: {
          WebkitFilter: ''
        }
      },
      ease: 'ease-in',
      duration: '.5s'
    }
  }

  constructor(...args) {
    super(...args);

    this.handleLoad = ::this.handleLoad;
  }

  shouldComponentUpdate() {
    return false;
  }

  handleLoad() {
    React.findDOMNode(this.refs.preview).style.visibility = 'hidden';
    transition(React.findDOMNode(this.refs.blur), this.props.animation);
  }

  render() {
    const { src, preview, style, ...props } = this.props;

    const sizeStyle = {
      width: this.props.width,
      height: this.props.height
    };

    const wrapperStyle = {
      position: 'relative',
      overflow: 'hidden',
      ...sizeStyle,
      ...style
    };

    const blurStyle = {
      width: this.props.width + 10,
      height: this.props.height + 10,
      margin: `-${this.props.blur}px 0 0 -${this.props.blur}px`,
      padding: 10,
      WebkitFilter: `blur(${this.props.blur}px)`
    };

    const imageStyle = {
      position: 'absolute',
      ...sizeStyle
    };

    return (
      <div { ...props } style={ wrapperStyle }>
        <div ref='blur' style={ blurStyle }>
          <img style={ imageStyle } src={ this.props.src } onLoad={ this.handleLoad }/>
          <img style={ imageStyle } src={ `data:image/png;base64,${this.props.preview}` } ref='preview'/>
        </div>
      </div>
    );
  }

}
