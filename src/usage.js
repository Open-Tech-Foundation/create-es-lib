const chalk = require('chalk');

module.exports = () => {
  const usage = chalk` {bold.cyan Usage:}

    $ npx create-node-lib <your-lib-name>
  `;
  console.log(usage);
};
