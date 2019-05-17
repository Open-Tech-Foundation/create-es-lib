const chalk = require('chalk');

module.exports = () => {
  const usage = chalk` {bold.cyan Usage:}

    $ npx create-node-lib <your-project-name>
  `;
  console.log(usage);
};
