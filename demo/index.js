'use strict';

const ifi = require('../src/index.js');

document.addEventListener('DOMContentLoaded', function(){

  const attachments = document.querySelector('input[name="attachments"]');
  const fileInput = new ifi(attachments, 5);

  document.getElementById('demoForm').addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('fileInput.files:', fileInput.files);
    //=> 'fileInput.files:' (2) [File, File]
  });
});

