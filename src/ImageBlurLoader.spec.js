import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';

let ImageBlurLoader = require('./ImageBlurLoader');

describe('ImageBlurLoader', () => {

  let renderer, output;

  beforeEach(function() {
    renderer = createRenderer();

    renderer.render(
      <ImageBlurLoader
        preview='previewstring'
        src='finalstring'
        width={ 10 }
        height={ 10 }
        blur={ 42 }
      />
    );

    output = renderer.getRenderOutput();

  });

  it('should display blurred preview image initially', () => {
    
    let preview = output.props.children[1],
        image = preview.props.children[0],
        blur = preview.props.children[1];

    expect(image.props.src).toEqual('previewstring');
    expect(blur.props.style.WebkitFilter).toEqual('blur(42px)');

  });

  it('should call moveit.transition on img.onLoad', () => {

    let transitionCalled = false;

    expect(output.props.children[0].props.src).toEqual('finalstring');

    // mock moveit.transition
    ImageBlurLoader.__Rewire__('transition',function() {
        transitionCalled = true;
    });

    // fake img.onLoad
    output.props.children[0].props.onLoad();

    expect(transitionCalled).toBe(true);

  });

  // it('should reach final transition state on img.onLoad', () => {
  //   // TODO
  // });

});
