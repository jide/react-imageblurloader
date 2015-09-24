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
    blur: 30,
    animation: {
      keyframes: {
        to: {
          opacity: 0
        }
      },
      duration: '.25s'
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
    transition(React.findDOMNode(this.refs.preview), this.props.animation);
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

    const imageStyle = {
      position: 'absolute',
      ...sizeStyle
    };

    const blurStyle = {
      WebkitFilter: `blur(${this.props.blur}px)`,
      ...imageStyle
    };

    return (
      <div { ...props } style={ wrapperStyle }>
        <img style={ imageStyle } src={ `data:image/png;base64,${this.props.preview}` }/>
        <img ref='image' style={ imageStyle } src={ this.props.src } onLoad={ this.handleLoad }/>
        <img style={ blurStyle } src={ `data:image/png;base64,${this.props.preview}` } ref='preview'/>
      </div>
    );
  }

}
