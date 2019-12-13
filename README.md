# inputfile

![npm](https://img.shields.io/npm/v/inputfile)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/inputfile.svg)](https://www.npmjs.com/package/inputfile)

A simple file input library

## Install

```
$ npm install inputfile
```

## Usage

```js
const InputFile = require('inputfile');
const attachments = document.querySelector('input[name="attachments"]');
const inputFile = new InputFile(attachments, 5);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('inputFile.files:', inputFile.files);
  //=> 'inputFile.files:' (2) [File, File]
});
