const Router = require('express').Router;
const {
    Surveys, sequelize
} = require("../../models");
const {
    Survey_Questions
} = require("../../models");
const {
    Survey_Answers
} = require("../../models");

const surveyRoutes = Router();
surveyRoutes
    .route('/:UserId')

    //display survey titles depends on UserID
    .get(async (req, res) => {
        const dbsurvey = await Surveys.findAll({
            where: {
                UserId: req.params.UserId
            }
        });
        res.json(dbsurvey);
    });
surveyRoutes
    .route('/surveyresult/:SurveyId')

    //display survey resuklt depends on surveyId
    .get(async (req, res) => {
        const dbsurvey = await Survey_Questions.findAll({
            where: {
                SurveyId: req.params.SurveyId
            },
            include: [Survey_Answers]
        });
        res.json(dbsurvey);
    })

surveyRoutes
    .route('/survey/:SurveyId')
    //display survey questions / title to be answered
    .get(async (req, res) => {
        const dbsurvey = await Survey_Questions.findAll({
            where: {
                SurveyId: req.params.SurveyId
            },
            include: [Surveys]
        });
        res.json(dbsurvey);
    })

surveyRoutes
    .route('/surveys')
    // save survey title from creator
    .post(async (req, res) => {
        console.log(req);
        const dbsurvey = await Surveys.create({
            survey_title: req.body.survey_title,
            UserId: req.user.id
        });
        console.log(dbsurvey);
        const results = await Survey_Questions.create({
            survey_questions: req.body.survey_questions,
            SurveyId: dbsurvey.id
        });
        res.json(results);
    })
    .delete(async (req, res) => {
        const options = {
            where: {
                SurveyId: req.body.SurveyId
            }
        };
        const dbsurvey = await Survey_Questions.destroy(options);
        res.json(dbsurvey);
    });
    
surveyRoutes
    .route('/survey/:id/answers')
    // save survey answer from responser
    .post(async (req, res) => {
        const dbsurvey = await Survey_Answers.create({
            answer1: req.body.question1,
            answer2: req.body.question2,
            answer3: req.body.question3,
            answer4: req.body.question4,
            answer5: req.body.question5,
            SurveyQuestionId: req.body.surveyQuestionId
        });
        res.json(dbsurvey);
    })
    .get(async (req, res) => {
        const surveyQuestions = await Survey_Questions.findOne({
            where:{
                SurveyId: req.params.id
            }
        })
        const surveyAnswers = await Survey_Answers.findAll({
            where: {
                surveyQuestionId: surveyQuestionId.id
            },
            attributes: [[
                sequelize.fn('COUNT', sequelize.col('id')), 
                sequelize.fn("SUM", sequelize.col("answer1")),
                sequelize.fn("SUM", sequelize.col("answer2")),
                sequelize.fn("SUM", sequelize.col("answer3")),
                sequelize.fn("SUM", sequelize.col("answer4")),
                sequelize.fn("SUM", sequelize.col("answer5")),
            ]]
        })
        res.json({
            surveyId: req.params.id,
            surveyQuestionId: surveyQuestionId.id,
            answers: surveyAnswers
        })
    })

module.exports = surveyRoutes;