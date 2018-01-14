const fs = require('fs');
const path = require('path');
const decache = require('decache');
const { promisify } = require('util');

let lastResult = '';
async function build() {
  decache('./data-tree');
  const { data } = require('./data-tree');
  let results;
  try {
    results = JSON.stringify(
      await data()
    );
  } catch(err) {
    console.log('[BUILD ERROR]', err);
  }
  if (lastResult === results) {
    console.log('src changed, but no change to output');
    return;
  }
  lastResult = results;
  try {
    await promisify(fs.rm)(path.resolve(__dirname, '../dist'))
    await promisify(fs.mkdir)(path.resolve(__dirname, '../dist'));
  } catch(err) {
    // directory already exists
  }
  fs.writeFile(path.resolve(__dirname, '../dist/docs.json'), results, (err) => {
    if (err) {
      console.log('[ERROR]', err);
    }
    console.log('docs built at "dist/"');
  });
}

build();
fs.watch(path.resolve(__dirname, './content'), build);
fs.watch(path.resolve(__dirname, './data-tree.js'), build);

console.log('watching for changes...');
