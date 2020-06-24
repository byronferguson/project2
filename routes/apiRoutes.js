const Router = require('express').Router;
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const exampleRoutes = require('./examples');

const apiRoutes = Router();

apiRoutes.use('/examples', exampleRoutes);

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
apiRoutes.post("/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
        email: req.user.email,
        id: req.user.id
    });
    // res.redirect("/surveys");

});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
apiRoutes.post("/signup", (req, res) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(() => {
            res.end();
        })
        .catch(err => {
            res.status(401).json(err);
        });
});

// Route for getting some data about our user to be used client side
apiRoutes.get("/user_data", (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});


apiRoutes.delete('/survey/delete/:id', async (req, res) => {
    const options = {
        where: {
            id: req.params.id
        }
    };
    const dbExample = await db.Surveys.destroy(options);
    res.json(dbExample);
});

module.exports = apiRoutes;


