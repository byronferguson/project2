const Router = require('express').Router;
const {
    Surveys
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
    
surveyRoutes
    .route('/surveyanswer')
    // save survey answer from responser
    .post(async (req, res) => {
        const dbsurvey = await Survey_Answers.create({
            survey_answers: req.body.survey_answers,
            SurveyQuestionId: req.body.SurveyQuestionId
        });
        res.json(dbsurvey);
    });

surveyRoutes
    .route('/surveydelete')
    // delete survey by surveyId
    .delete(async (req, res) => {
        const options = {
            where: {
                SurveyId: req.body.SurveyId
            }
        };
        const dbsurvey = await Survey_Questions.destroy(options);
        res.json(dbsurvey);
    });

module.exports = surveyRoutes;