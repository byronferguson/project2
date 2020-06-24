// Get references to page elements
const $ = window.$;
// const $exampleText = $('#example-text');
// const $exampleDescription = $('#example-description');
// const $submitBtn = $('#submit');
// const $exampleList = $('#example-list');

// The API object contains methods for each kind of request we'll make
const API = {
  // saveExample: function (example) {
  //   return $.ajax({
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     type: 'POST',
  //     url: 'api/examples',
  //     data: JSON.stringify(example)
  //   });
  // },
  // getExamples: function () {
  //   return $.ajax({
  //     url: 'api/examples',
  //     type: 'GET'
  //   });
  // },
  deleteExample: function (id) {
    return $.ajax({
      url: 'api/survey/delete/' + id,
      type: 'DELETE'
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// const refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     const $examples = data.map(function (example) {
//       const $a = $('<a>')
//         .text(example.text)
//         .attr('href', '/example/' + example.id);

//       const $li = $('<li>')
//         .attr({
//           class: 'list-group-item',
//           'data-id': example.id
//         })
//         .append($a);

//       const $button = $('<button>')
//         .addClass('btn btn-danger float-right delete')
//         .text('ｘ');

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// const handleFormSubmit = function (event) {
//   event.preventDefault();

//   const example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     window.alert('You must enter an example text and description!');
//     return;
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples();
//   });

//   $exampleText.val('');
//   $exampleDescription.val('');
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function () {
  const idToDelete = $(this).attr('data-surveyid');
  API.deleteExample(idToDelete).then(function () {
    location.reload();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on('click', handleFormSubmit);
// $exampleList.on('click', '.delete', handleDeleteBtnClick);

// Button to take us from login page to create survey
$("#start").on("click", function () {
  window.location.href = "/surveys/create"
})
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});

$("#delete-Btn").on("click", handleDeleteBtnClick);