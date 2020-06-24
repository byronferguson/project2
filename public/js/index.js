// Get references to page elements
const $ = window.$;
const $exampleText = $('#example-text');
const $exampleDescription = $('#example-description');
const $submitBtn = $('#submit');
const $exampleList = $('#example-list');

// The API object contains methods for each kind of request we'll make
const API = {
    deleteExample: function (id) {
        return $.ajax({
            url: 'api/survey/delete/' + id,
            type: 'DELETE'
        });
    }
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function () {
    const idToDelete = $(this).attr('data-surveyid');
    API.deleteExample(idToDelete).then(function () {
        location.reload();
    });
};

// Add event listeners to the submit and delete buttons
$("#delete-Btn").on("click", handleDeleteBtnClick);

// Button to take us from login page to create survey
$("#start").on("click", function () {
    window.location.href = "/surveys/create"
})
$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        if (!data.email) {
            $(".user-control").hide();
        } else {
            $(".user-control").show();
        }
        $(".member-name").text(data.email);
    });
});
