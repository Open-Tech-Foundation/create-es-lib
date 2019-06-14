const chalk = require('chalk');
const { version } = require('../../package.json');

module.exports = () => {
  const header = chalk`\n\t{bold.rgb(255, 136, 0) create-node-lib} {gray [v${version}]} \n`;
  console.log(header);
};
