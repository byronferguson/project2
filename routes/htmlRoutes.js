const Router = require('express').Router;
const db = require('../models');

const htmlRoutes = new Router();

htmlRoutes.get('/', async (req, res) => {
  res.render('index', {});
});

htmlRoutes.get('/signUp', async (req, res) => {
    res.render('signUp', {});
})

// Load example page and pass in an example by id
htmlRoutes.get('/example/:id', async (req, res) => {
  const options = {
    where: {
      id: req.params.id
    }
  };

  const dbExample = await db.Example.findOne(options);

  res.render('example', {
    example: dbExample
  });
});

// connect to survey handlebars
htmlRoutes.get('/surveys/create', async (req, res) => {
  res.render('createSurvey');
});

//for all user surveys
htmlRoutes.get('/surveys', async (req, res) => {
  res.render('surveys');
});

//for each created survey
htmlRoutes.get('/surveys/:id/take', async (req, res) => {
  res.render('takeSurvey', {
    survey: {
      id: 1,
      title: "My Survey",
      questions: [
        {
          id: 1,
          question: "Whats your name?"
        },
        {
          id: 2,
          question: "Shut up?"
        }
      ]
    }
  });
});

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});


module.exports = htmlRoutes;
