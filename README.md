# improved-file-input

[![npm (scoped)](https://img.shields.io/npm/v/@therealpadster/inputfile.svg)](https://www.npmjs.com/package/@therealpadster/inputfile)
![npm bundle size](https://img.shields.io/bundlephobia/min/@therealpadster/inputfile?label=minified%20size)

A simple file input library to expand the functionality of the HTML5 file input.

## Install

```
$ npm install improved-file-input
```

## Usage

```js
const ifi = require('improved-file-input');
const attachments = document.querySelector('input[name="attachments"]');
const fileInput = new ifi(attachments, 5);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('fileInput.files:', fileInput.files);
  //=> 'fileInput.files:' (2) [File, File]
});
