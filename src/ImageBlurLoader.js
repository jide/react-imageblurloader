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
        from: {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      },
      duration: '.5s'
    }
  }

  constructor(...args) {
    super(...args);

    this.handleLoad = ::this.handleLoad;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.src !== nextProps.src ||
      this.props.preview !== nextProps.preview;
  }

  componentWillUpdate() {
    this.refs.preview.style.opacity = 1;
  }

  handleLoad() {
    // src loaded, transition the blur
    transition(this.refs.preview, this.props.animation);
  }

  render() {
    const {
      width,
      height,
      src,
      preview,
      blur,
      style,
      animation,
      ...props
    } = this.props;

    const sizeStyle = {
      width,
      height
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
        <img style={ imageStyle } src={ this.props.src } onLoad={ this.handleLoad }/>
        <div ref='preview'>
          <img style={ imageStyle } src={ `${this.props.preview}` }/>
          <img style={ blurStyle } src={ `${this.props.preview}` }/>
        </div>
      </div>
    );
  }

}
