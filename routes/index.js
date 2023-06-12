const userRoutes = require('./users');
const diseaseRoutes = require('./diseases')
const forumRoutes = require('./forum')
const path = require("path")

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/disease',diseaseRoutes);
  app.use('/forum',forumRoutes);

  app.use('*', (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;