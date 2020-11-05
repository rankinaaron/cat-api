const express = require('express');
const router = express.Router();
const catModel = require('../models/cat.model');

/* GET random cat */
router.get('/:id?', (req, res, next) => {
  if (!req.params.id) {
    catModel.aggregate().sample(1).then( doc => {
      res.json(doc)
    })
    .catch( err => {
      res.status(500).json(err)
    })
  } else {
    catModel.findOne({
      id: req.params.id
    }).then( doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  
});

/* POST a new cat */
router.post('/', (req, res, next) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  const model = new catModel(req.body);
  model.save()
    .then( doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

/* DELETE a cat */
router.delete('/:id', (req, res, next) => {
  catModel.findOneAndRemove({
    id: req.params.id
  })
  .then(doc => {
    res.json(doc)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})


module.exports = router;
