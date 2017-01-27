const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const ObjectId = require('mongodb').ObjectId;

const cwd = process.cwd();
const con = require(`${cwd}/utils/mongoConnection.js`).con;
const log = require(`${cwd}/utils/logger.js`).logUtil('authCommands');
const authConfig = require(`${cwd}/authConfig.json`);

module.exports = ( app ) => {

  passport.use(new Strategy((username, password, cb) => {
    getAuthForUser(username, password).then(
      user => cb(null, user),
      err => cb(err)
    )
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    getUserById(id).then(
      (user) => cb(null, user),
      (err) => cb(err)
    );
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if(requiresAuth(req) && (!req.isAuthenticated || !req.isAuthenticated())){
      res.redirect(`/login?redirect=${req.originalUrl}`);
    } else {
      next();
    }
  });

  app.post('/login',
    (req, res, next) => {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        } else if (!user) {
          return res.redirect(`/login${req.query.redirect ? `?redirect=${req.query.redirect}` : ''}`);
        } else {
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect(req.query.redirect || '/');
          });
        }
      })(req, res, next);
  });
};

function getAuthForUser(username, password) {
  log(`getAuth for ${username}`);
  return con((users, resolve, reject) => {
    users.findOne({username}, (err, user) => {
      if(err) {
        reject(err);
      } else if(user && user.password === password) {
        log(`Auth success for ${username}`);
        resolve(user);
      } else {
        log(`Auth failed for ${username}`);
        resolve(false);
      }
    });
  }, 'users');
}

function getUserById(_id) {
  return con((users, resolve, reject) => {
    users.findOne({_id: new ObjectId(_id)}, (err, user) => {
      if(err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  }, 'users');
}

function requiresAuth(request) {
  if(authConfig[request.path] == undefined){
    return true;
  } else {
    return authConfig[request.path][request.method];
  }
}