const cwd = process.cwd();
const con = require(`${cwd}/utils/mongoConnection.js`).con;
const log = require(`${cwd}/utils/logger.js`).logUtil('userCommands');

module.exports = ( app ) => {
  app.post('/register',(req, res) => {
    register(req.body).then(
      registered => {
        if(registered) {
          res.redirect('/login');
        } else {
          res.redirect('/register');
        }
      },
      err => {
        log(`Problem registering: ${JSON.stringify(err)}`);
        res.redirect('/error');
      }
    );
  });
};

function register(user) {
  return con((users, resolve, reject) => {
    findUser(user).then(
      found => {
        if(found) {
          resolve(false);
        } else {
          users.insertOne(user, function(err, r){
            if(err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        }
      },
      err => reject(err));
  }, 'users');
}

function findUser(user) {
  return con((users, resolve, reject) => {
    users.findOne({username: user.username}, (err, foundUser) => {
      if(err) {
        reject(err);
      } else {
        resolve(!!foundUser);
      }
    });
  }, 'users');
}