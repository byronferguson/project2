const { Surveys } = require("../../models");
const { Survey_Questions } = require("../../models");
const { Survey_Answers } = require("../../models");

module.exports = function (app) {

    app.get("/api/surveys", async (req, res) => {
        const allsurveys = await Surveys.findAll({
        });
        res.json(allsurveys);
    });
    app.get("/api/survey/:user", async (req, res) => {
        const survey = await Survey_Questions.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        res.json(survey);
    });

    app.get("/api/surveyquestions/:user_id/:survey_id", async (req, res) => {

        const questions = await Survey_Questions.findAll({
            where: {
                user_id: req.params.user_id,
                survey_id: req.params.survey_id
            }
        });
        res.json(questions);
    });

    app.post("/api/surveyquestions", async (req, res) => {
        const surveydata = await Survey_Questions.create(req.body);
        res.json(surveydata);
    });

    app.delete("/api/surveyquestions/:user_id/:survey_id", async (req, res) => {
        const surveydelelte = await Survey_Questions.destroy({
            where: {
                // user_id: req.params.user_id,
                survey_id: req.params.survey_id
            }
        });
        res.json(surveydelelte);

    });

};
