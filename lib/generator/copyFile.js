const path = require('path');
const { mkdirSync, copyFileSync } = require('fs');

module.exports = (source, dest) => {
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(source, dest);
};
