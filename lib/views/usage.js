const chalk = require('chalk');

module.exports = () => {
  const usage = chalk` {bold.cyan Usage:}

    $ npx @open-tech-world/create-node-lib <your-project-name>
  `;
  console.log(usage);
};
