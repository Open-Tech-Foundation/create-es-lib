const inquirer = require('inquirer');
const questions = require('./questions');

class Generator {
  constructor(name) {
    this.name = name;
  }

  async start() {
    const params = await inquirer.prompt(questions(this.name));
    console.log(params);
  }
}

module.exports = Generator;
