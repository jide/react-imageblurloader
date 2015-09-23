'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moveit = require('moveit');

var ImageBlurLoader = (function (_Component) {
  _inherits(ImageBlurLoader, _Component);

  _createClass(ImageBlurLoader, null, [{
    key: 'propTypes',
    value: {
      width: _react.PropTypes.number.isRequired,
      height: _react.PropTypes.number.isRequired,
      src: _react.PropTypes.string.isRequired,
      preview: _react.PropTypes.string.isRequired,
      blur: _react.PropTypes.number,
      style: _react.PropTypes.object,
      animation: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
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
    },
    enumerable: true
  }]);

  function ImageBlurLoader() {
    _classCallCheck(this, ImageBlurLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(ImageBlurLoader.prototype), 'constructor', this).apply(this, args);

    this.handleLoad = this.handleLoad.bind(this);
  }

  _createClass(ImageBlurLoader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'handleLoad',
    value: function handleLoad() {
      _react2['default'].findDOMNode(this.refs.preview).style.visibility = 'hidden';
      (0, _moveit.transition)(_react2['default'].findDOMNode(this.refs.blur), this.props.animation);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var src = _props.src;
      var preview = _props.preview;
      var style = _props.style;

      var props = _objectWithoutProperties(_props, ['src', 'preview', 'style']);

      var sizeStyle = {
        width: this.props.width,
        height: this.props.height
      };

      var wrapperStyle = _extends({
        position: 'relative',
        overflow: 'hidden'
      }, sizeStyle, style);

      var blurStyle = {
        width: this.props.width + 10,
        height: this.props.height + 10,
        margin: '-' + this.props.blur + 'px 0 0 -' + this.props.blur + 'px',
        padding: 10,
        WebkitFilter: 'blur(' + this.props.blur + 'px)'
      };

      var imageStyle = _extends({
        position: 'absolute'
      }, sizeStyle);

      return _react2['default'].createElement(
        'div',
        _extends({}, props, { style: wrapperStyle }),
        _react2['default'].createElement(
          'div',
          { ref: 'blur', style: blurStyle },
          _react2['default'].createElement('img', { style: imageStyle, src: this.props.src, onLoad: this.handleLoad }),
          _react2['default'].createElement('img', { style: imageStyle, src: 'data:image/png;base64,' + this.props.preview, ref: 'preview' })
        )
      );
    }
  }]);

  return ImageBlurLoader;
})(_react.Component);

exports['default'] = ImageBlurLoader;
module.exports = exports['default'];