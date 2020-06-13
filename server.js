require('dotenv').config();
const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set('view engine', 'handlebars');

// Routes
app.use(routes);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
