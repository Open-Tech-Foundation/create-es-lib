const chalk = require('chalk');

module.exports = (projectPath, libType, pkgManager) => {
  if (libType === 'CLI') {
    console.log(`
      To get started, run:
  
      $ ${chalk.cyan('cd')} ${projectPath} ${chalk.cyan('&&')} node cli.js
    
    `);
  } else {
    console.log(`
      To get started, run:
  
      $ ${chalk.cyan('cd')} ${projectPath} ${chalk.cyan('&&')} ${
      pkgManager.cmd
    } start
      
      To build, run:
      
      $ ${pkgManager.cmd}${pkgManager.cmd === 'npm' ? ' run' : ''} build

      It will compile your lib and create cjs && esm modules to "dist" folder
    `);
  }
};
