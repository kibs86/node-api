'use strict';

const fs = require('fs');

const inFile = process.argv[2];

// fs.readFile(file, options, callback)
fs.readFile(inFile, 'utf-8', (error, data) => {
  if (error) {
    console.error(error.stack);
    return;
  }

  let dataArray = data.split(' ');

  dataArray.forEach((name) => {
    console.log("HEYYYY ", name);
  });

  // const showNames = function(name) {
  //  console.log("HEYYYY ", name);
  // };
  //
  // dataArray.forEach(showNames);
});
