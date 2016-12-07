'use strict';

// what does it do?
// takes a file that has json in it and write it to a different file

// grab fs module and import it
const fs = require('fs');

// define what standard in and standard out are
// for this scripts purposes stdin will be what we type IN to the terminal
const stdin = '/dev/stdin';
// and stdout will be what the terminal spits out
const stdout = '/dev/stdout';

// node copy-json.js data/names.json ...

// define inFile as the 3rd argument from the command line
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];

// outFile is going to be the 4th argument passed on the command line
// OR
// spit out in our terminal
let outFile = process.argv[3] ? process.argv[3] : stdout;

// if outfile is stdout we need to set hte flag to append (so we don't overwrite)
// our terminal)
// otherwise, we want to overwrite the file and replace it with new contents
let outFileFlag = outFile === stdout ? 'a' : 'w';

// use fs to run readfile, pass it the inFile, encode in utf8, and declare a
// callback.
// the callback takes (as arguments) 'error' and 'data'
fs.readFile(inFile, { encoding: 'utf8' }, (error, data) => {
  let json, pojo;
  if (error) {
    console.error(error.stack);
    return;
  }

  // try/catch block
  // try the thing.  if it doesn't work, catch the error
  try {
    // if (data) is json, and JSON.parse is able to do its job we're good
    pojo = JSON.parse(data);
    // otherwise console.error the error
  } catch (error) {
    console.error(error.stack);
    return;
  }

  // convert into object - first name key, last name value
  let newPojo = {names: {}};
  let splitPojo = [];
  for (let i = 0; i < pojo.names.length; i++) {
    splitPojo = pojo.names[i].split(' ');
    newPojo.names[splitPojo[0]] = splitPojo[1];
  }

  // turn the pojo back into json
  json = JSON.stringify(newPojo, null, 2);

  // use writeFile to "write a file"
  // takes the outFile (file we're writing to)
  // json (the pojo stringified from line 56)
  // the flag (set on line 30) 'a' or 'w' depending on where we want our output
  // and a callback which only hsa one argument (error)
      // - error
  fs.writeFile(outFile, json, { flag: outFileFlag }, error => {
    if (error) {
      console.error(error.stack);
      return;
    }

    console.error('\ncopied');
  });
});
