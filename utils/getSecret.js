const fs = require('fs');

const cwd = process.cwd();
const log = require(`${cwd}/utils/logger.js`).logUtil('getSecret');

exports.secret = getSecret();

function getSecret () {
  let secret = 'secret';
  try {
    secret = `${fs.readFileSync(`${cwd}/.secret`)}`;
  } catch (error) {
    log('Please create a .secret file in your current working directory!');
  }
  return secret;
}