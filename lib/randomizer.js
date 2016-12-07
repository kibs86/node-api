'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
// const stdout = '/dev/stdout';

let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
// let outFile = process.argv[3] ? process.argv[3] : stdout;

// let outFileFlag = outFile === stdout ? 'a' : 'w';

const shuffle = (dataArray) => {

for (let i = 0; i < dataArray.length; i++) {
  let j = Math.floor(Math.random() * dataArray.length);
  let k = dataArray[i];
  dataArray[i] = dataArray[j];
  dataArray[j] = k;
}
return dataArray;
};

fs.readFile(inFile, 'utf-8', (error, data) => {
  if (error) {
    console.error(error.stack);
    return;
  }

  let dataArray = data.split(' ');
  dataArray.pop();

  shuffle(dataArray);

  dataArray.forEach((name) => {
    console.log("HEYYYY ", name);
  });

  // fs.writeFile(outFile, { flag: outFileFlag }, error => {
  //   if (error) {
  //     console.error(error.stack);
  //     return;
  //   }
  //
  //   console.error('\ncopied');
  // });
});
