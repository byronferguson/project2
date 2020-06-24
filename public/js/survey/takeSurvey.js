$(function(){
    console.log("survey page");
    
    $(".survey-url").text(document.URL);
    $("#takeSurveyBtn").on("click", submitSurvey);

    function submitSurvey() {
        const answers = [];
        const surveyQuestionId = $("#surveyQuestionId").attr("value");
        const surveyId = $("#surveyId").attr("value");
        for (let index = 0; index < 5; index++) {
            const answer = $(`input[id="true${index}"]:checked`).val();
            console.log(answer);
            (answer) ? answers.push(true): answers.push(false);
        }
        $.ajax({
            url: `/survey/${surveyId}/answers`,
            type: "POST",
            data: {
                surveyQuestionId: surveyQuestionId,
                question1: answers[0],
                question2: answers[1],
                question3: answers[2],
                question4: answers[3],
                question5: answers[4],
            },
            success: function (result) {
                console.log(result);
                window.location.href = `/surveys/${surveyId}/results`;
            }
        });
    }
});