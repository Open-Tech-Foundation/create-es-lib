const inquirer = require('inquirer');
const questions = require('./questions');

class Generator {
  constructor(name) {
    this.name = name;
    this.config = {};
  }

  start() {
    inquirer.prompt(questions(this.name)).then((answers) => {
      this.config = answers;
      console.log(this.config);
    });
  }
}

module.exports = Generator;
