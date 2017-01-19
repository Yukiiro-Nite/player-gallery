const cwd = process.cwd();
const fs = require('fs');
const log = require(`${cwd}/utils/logger.js`).logUtil('registerCommands');

module.exports = ( app ) => {

  let commands = {};
  
  const getCommands = () => {
    return new Promise((resolve, reject) => {
      fs.readdir(`${process.cwd()}/commands`, (err, files) => {
        if(err) {
          log(`Error finding command files: ${JSON.stringify(err)}`);
          reject();
        } else {
          resolve(files.filter(file => file.endsWith('.js') || file.endsWith('.json')));
        }
      });
    });
  };
  
  const registerCommands = files => {
    files.forEach( file => {
      log(`Registering ${file}`);
      commands[file] = require(`${cwd}/commands/${file}`)(app);
    });
  };
  
  getCommands().then(registerCommands);
};
