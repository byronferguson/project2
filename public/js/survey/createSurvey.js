$(function () {
    $("#createSurveyBtn").on("click", creatSurvey)

    function creatSurvey() {
        const surveyTitle = $("#surveyTitle").val().trim();
        const questions = [
            $("#question1").val().trim(),
            $("#question2").val().trim(),
            $("#question3").val().trim(),
            $("#question4").val().trim(),
            $("#question5").val().trim()
        ]
        if (!(surveyTitle && questions[0] && questions[1] && questions[2] && questions[3] && questions[4])) {
            window.alert('You must enter your survey information!');
            return;
        }

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