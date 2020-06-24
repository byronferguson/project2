$(document).ready(function () {
    // Getting references to our form and inputs
    const loginForm = $("form.inputs-form");
    const emailInput = $("input#login-email");
    const passwordInput = $("input#login-password");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .done((res) => {
                console.log("log in successful");
                window.location.replace("/surveys")
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }
});
