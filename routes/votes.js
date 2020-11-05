const express = require('express');
const router = express.Router();
const voteModel = require('../models/vote.model');

/* GET all votes */
router.get('/', (req, res, next) => {
  res.send('in here');
  voteModel.find().then( doc => {
      res.json(doc)
  })
  .catch(err => {
      res.status(500).json(err)
  })
});

/* POST a new vote */
router.post('/', (req, res, next) => {
  console.log('in here');
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  const model = new voteModel(req.body);
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

/* DELETE a vote */
router.delete('/:id', (req, res, next) => {
  voteModel.findOneAndRemove({
    image_id: req.params.id
  })
  .then(doc => {
    res.json(doc)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})


module.exports = router;
