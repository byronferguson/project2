const Router = require('express').Router;
const db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const htmlRoutes = new Router();

htmlRoutes.get('/', async (req, res) => {
  // console.log(req.user) can use req.user to pull matching surveys from db;
  res.render('index', {});
});

htmlRoutes.get('/signUp', async (req, res) => {
  res.render('signUp', {});
})

// Load example page and pass in an example by id
htmlRoutes.get('/example/:id', async (req, res) => {
  //if user is logged in let them access otherwise send them to login page
  if (req.user) {
    const options = {
      where: {
        id: req.params.id
      }
    };

    const dbExample = await db.Example.findOne(options);

    res.render('example', {
      example: dbExample
    });
  }
  res.render('index', {});
});

// connect to survey handlebars
htmlRoutes.get('/surveys/create', isAuthenticated, async (req, res) => {
  //if user is logged in let them access otherwise send them to login page
  res.render('createSurvey');
});

//for all user surveys.
htmlRoutes.get('/surveys', isAuthenticated, (_req, res) => {
  res.render('surveys', {});

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

// not working at cause to break. need to come back too
// // Route for logging user out
// apiRoutes.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

module.exports = htmlRoutes;
