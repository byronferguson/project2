const Router = require('express').Router;
const { Example } = require('../../models');

const exampleRoutes = Router();

// Get all examples
exampleRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbExamples = await Example.findAll();
    res.json(dbExamples);
  })

  .post(async (req, res) => {
    const dbExample = await Example.create(req.body);
    res.json(dbExample);
  });

// Delete an example by id
exampleRoutes
  .route('/:id')
  .put(async (_req, res) => {
    res.status(501).end();
  })
  .delete(async (req, res) => {
    const options = {
      where: {
        id: req.params.id
      }
    };
    const dbExample = await Example.destroy(options);
    res.json(dbExample);
  });

module.exports = exampleRoutes;
