const express = require('express');
const app = express();
const port = 3008;

const log = require('./utils/logger.js').logUtil('Server');
const registerCommands = require('./utils/registerCommands');

app.use(express.static('public'));


registerCommands(app);

app.listen(port, ()=>{
  log(`Listening on port: ${port}`);
});
