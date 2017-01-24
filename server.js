const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')();
const getSecret = require('./utils/getSecret');
const expressSession = require('express-session')({ secret: getSecret.secret, resave: true, saveUninitialized: true });
const port = 3008;

const log = require('./utils/logger.js').logUtil('Server');
const registerCommands = require('./utils/registerCommands');

app.use((req, res, next) => {
  log(`Request at ${req.originalUrl}`);
  next();
});

app.use(express.static('public'));
app.use(cookieParser);
app.use(expressSession);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

registerCommands(app);

app.listen(port, () => {
  log(`Listening on port: ${port}`);
});
