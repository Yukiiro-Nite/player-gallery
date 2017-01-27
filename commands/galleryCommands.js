const ObjectId = require('mongodb').ObjectId;

const cwd = process.cwd();
const con = require(`${cwd}/utils/mongoConnection.js`).con;
const log = require(`${cwd}/utils/logger.js`).logUtil('galleryCommands');

module.exports = ( app ) => {
  app.get('/api/galleries',
    (req, res) => {
    readGalleries().then(
      galleries => res.send(galleries),
      err => res.status(500).send(err)
    );
  });

  app.get('/api/gallery/:id', (req, res) => {
    readGallery(req.params.id).then(
      gallery => res.send(gallery),
      err => res.status(500).send(err)
    );
  });

  app.post('/api/gallery', (req, res) => {
    createGallery(req.body).then(
      status => res.send(status),
      err => res.status(500).send(err)
    );
  });

  app.put('/api/gallery/:id', (req, res) => {
    updateGallery(req.params.id, req.body).then(
      status => res.send(status),
      err => res.status(500).send(err)
    );
  });

  app.delete('/api/gallery/:id', (req, res) => {
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
    galleries.findOne({_id: new ObjectId(id)}, (err, foundGallery) => {
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
    galleries.insertOne(gallery, (err, r) => {
      if(err) {
        reject(err);
      } else {
        resolve({success:true});
      }
    });
  }, 'galleries');
}

function updateGallery(id, gallery) {
  return con((galleries, resolve, reject) => {
    galleries.update({_id: new ObjectId(id)}, gallery, (err, r) => {
      if(err) {
        reject(err);
      } else {
        resolve({success:true});
      }
    });
  }, 'galleries');
}

function deleteGallery(id) {
  return con((galleries, resolve, reject) => {
    galleries.remove({_id: new ObjectId(id)});
    resolve({success:true});
  }, 'galleries');
}