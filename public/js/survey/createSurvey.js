$(function () {
    $("#createSurveyBtn").on("click", creatSurvey)

    function creatSurvey() {
        const surveyTitle = $("#surveyTitle").val();
        const questions = [
            $("#question1").val(),
            $("#question2").val(),
            $("#question3").val(),
            $("#question4").val(),
            $("#question5").val()
        ]
        console.log(surveyTitle, questions);

        $.ajax({
            url: "/surveys",
            type: "POST",
            data: {
                survey_title: surveyTitle,
                survey_questions: JSON.stringify(questions)
            },
            success: function (result) {
                console.log(result);
                window.location.href = `/surveys/${result.id}/take`;
            }
        });
    };
});