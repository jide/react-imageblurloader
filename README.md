# react-imageblurloader

![npm](https://img.shields.io/npm/v/react-imageblurloader.svg) ![license](https://img.shields.io/npm/l/react-imageblurloader.svg) ![github-issues](https://img.shields.io/github/issues/jide/react-imageblurloader.svg)

![nodei.co](https://nodei.co/npm/react-imageblurloader.png?downloads=true&downloadRank=true&stars=true)

Show a nice blurry preview while your images are loading.

![demo](./demo/demo.gif)

## Install

`npm install -S react-imageblurloader`

## Usage

```html
<ImageBlurLoader
  src={ image.url }
  preview='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEU...'
  width={ 1024 }
  height={ 768 }
/>
```

## Demo

`npm start` then visit http://127.0.0.1:3000

## Generating previews

Using ImageMagick : `convert input.jpg -resize 20x20 -quality 70 preview.jpg`

Then get the base64 : `base64 preview.jpg`
