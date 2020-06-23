const Router = require('express').Router;
const db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const {
  sequelize
} = require('../models');

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
htmlRoutes.get('/surveys', isAuthenticated, async (req, res) => {
  const surveys = await db.Surveys.findAll({
    attributes: ['survey_title'],
    where: {
      UserId: req.user.id
    }
  });
  console.log(surveys)
  res.render('surveys', {
    Surveys: surveys
  });
});

//for each created survey
htmlRoutes.get('/surveys/:id/take', async (req, res) => {
  // getting surveys from database
  const options = {
    where: {
      id: req.params.id
    }
  };

  const surveys = await db.Surveys.findOne(options);
  const surveyQuestions = await db.Survey_Questions.findOne({
    where: {
      SurveyId: surveys.id
    }
  });

  const questions = JSON.parse(surveyQuestions.survey_questions);

  res.render('takeSurvey', {
    survey: {
      id: surveys.id,
      title: surveys.survey_title,
      survey_question_id: surveyQuestions.id,
      // q is each question, i=index in the array
      questions: questions.map((q, i) => {
        return {
          id: i,
          question: q
        }
      })
    }
  });
});

// route to view results 
htmlRoutes.get('/surveys/:id/results', async (req, res) => {
  const surveys = await db.Surveys.findOne({
    where: {
      id: req.params.id
    }
  });
  const surveyQuestions = await db.Survey_Questions.findOne({
    where: {
      SurveyId: req.params.id
    }
  })
  const surveyAnswers = await db.Survey_Answers.findAll({
    where: {
      SurveyQuestionId: surveyQuestions.id
    },
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), "count"],
      [sequelize.fn("SUM", sequelize.col("answer1")), "answer1"],
      [sequelize.fn("SUM", sequelize.col("answer2")), "answer2"],
      [sequelize.fn("SUM", sequelize.col("answer3")), "answer3"],
      [sequelize.fn("SUM", sequelize.col("answer4")), "answer4"],
      [sequelize.fn("SUM", sequelize.col("answer5")), "answer5"],
    ]
  })

  console.log("survey results:", surveyAnswers[0].dataValues);
  const questions = JSON.parse(surveyQuestions.survey_questions);

  const data = {
    surveyTitle: surveys.survey_title,
    surveyId: req.params.id,
    surveyQuestionId: surveyQuestions.id,
    total: surveyAnswers[0].dataValues.count,
    answers: questions.map((q, i) => {
      return {
        question: q,
        numTrue: surveyAnswers[0].dataValues["answer" + (i + 1)],
        numFalse: surveyAnswers[0].dataValues.count - surveyAnswers[0].dataValues["answer" + (i + 1)]
      }

    })
  }
  console.log(data);
  res.render('surveyResults', {
    surveyResults: data
  });
});

htmlRoutes.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

module.exports = htmlRoutes;