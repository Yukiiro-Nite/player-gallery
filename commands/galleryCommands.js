const cwd = process.cwd();
const con = require(`${cwd}/utils/mongoConnection.js`).con;
const log = require(`${cwd}/utils/logger.js`).logUtil('galleryCommands');

module.exports = ( app ) => {
  app.get('/galleries', (req, res) => {
    readGalleries().then(
      res.send,
      res.status(500).send
    );
  });

  app.get('/gallery/:id', (req, res) => {
    readGallery(req.params.id).then(
      res.send,
      res.status(500).send
    );
  });

  app.post('/gallery', (req, res) => {
    createGallery(req.body).then(
      res.send,
      res.status(500).send
    );
  });

  app.put('/gallery/:id', (req, res) => {
    updateGallery(req.params.id, req.body).then(
      res.send,
      res.status(500).send
    );
  });

  app.delete('/gallery/:id', (req, res) => {
    deleteGallery(req.params.id).then(
      res.send,
      res.status(500).send
    );
  });
};

function readGalleries() {
  return con((galleries, resolve, reject) => {
    galleries.find({}).toArray((err, galleries) => {
      if(err) {
        reject(err);
      } else {
        resolve(galleries);
      }
    });
  }, 'galleries');
}

function readGallery(id) {
  return con((galleries, resolve, reject) => {
    galleries.find({id}).toArray((err, galleries) => {
      if(err) {
        reject(err);
      } else {
        resolve(galleries);
      }
    });
  }, 'galleries');
}

function createGallery(gallery) {
  return con((galleries, resolve, reject) => {

  }, 'galleries');
}

function updateGallery(id, gallery) {
  return con((galleries, resolve, reject) => {

  }, 'galleries');
}

function deleteGallery(id) {
  return con((galleries, resolve, reject) => {

  }, 'galleries');
}