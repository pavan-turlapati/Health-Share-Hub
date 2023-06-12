const express = require('express');
const app = express();
const session = require('express-session');
const static = express.static(__dirname +'/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const xss = require('xss');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

app.use('/public',static)
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}))

//XSS
app.use("*", (req, res, next) => {
  // console.log(req.method);

  if (req.body) {
    // console.log(req.body);
    Object.keys(req.body).map(function (key, index) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    });
    // console.log(req.body);

    if (req.params) {
      // console.log(req.params);
      Object.keys(req.params).map(function (key, index) {
        if (typeof req.params[key] === "string") {
          req.params[key] = xss(req.params[key]);
        }
      });
      // console.log(req.params);
    }
    next();
  } else {
    next();
  }
});

// app.use("/profile", (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   } else {
//     next();
//   }
// });

// app.use("/searchProfile/:id", (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   } else {
//     next();
//   }
// })



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});