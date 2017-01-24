const cwd = process.cwd();
const con = require(`${cwd}/utils/mongoConnection.js`).con;
const log = require(`${cwd}/utils/logger.js`).logUtil('galleryCommands');
const passport = require('passport');

module.exports = ( app ) => {
  app.get('/galleries',
    (req, res) => {
    readGalleries().then(
      galleries => res.send(galleries),
      err => res.status(500).send(err)
    );
  });

  app.get('/gallery/:id', (req, res) => {
    readGallery(req.params.id).then(
      gallery => res.send(gallery),
      err => res.status(500).send(err)
    );
  });

  app.post('/gallery', (req, res) => {
    createGallery(req.body).then(
      status => res.send(status),
      err => res.status(500).send(err)
    );
  });

  app.put('/gallery/:id', (req, res) => {
    updateGallery(req.params.id, req.body).then(
      status => res.send(status),
      err => res.status(500).send(err)
    );
  });

  app.delete('/gallery/:id', (req, res) => {
    deleteGallery(req.params.id).then(
      status => res.send(status),
      err => res.status(500).send(err)
    );
  });
};

function readGalleries() {
  return con((galleries, resolve, reject) => {
    galleries.find({}).toArray((err, foundGalleries) => {
      if(err) {
        log(`Error reading galleries: ${JSON.stringify(err)}`);
        reject(err);
      } else {
        resolve(foundGalleries);
      }
    });
  }, 'galleries');
}

function readGallery(id) {
  return con((galleries, resolve, reject) => {
    galleries.findOne({id}, (err, foundGallery) => {
      if(err) {
        reject(err);
      } else {
        resolve(foundGallery);
      }
    });
  }, 'galleries');
}

function createGallery(gallery) {
  return con((galleries, resolve, reject) => {
    resolve('Implement insert gallery');
  }, 'galleries');
}

function updateGallery(id, gallery) {
  return con((galleries, resolve, reject) => {
    resolve('Implement update gallery');
  }, 'galleries');
}

function deleteGallery(id) {
  return con((galleries, resolve, reject) => {
    resolve('Implement delete gallery');
  }, 'galleries');
}