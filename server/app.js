require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const cors = require("cors");

require("./configs/mongoose");

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// ================================================ ACTUALIZAR ===================================================
let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function(origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.locals.title = 'Wherever it Takes API';

app.use(session({
  secret: 'store passport',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

app.use(flash());
require('./passport')(app);

const index = require('./routes/index');
app.use('/', index);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const restaurantsRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantsRouter);

const likesRouter = require("./routes/likes");
app.use("/likes", likesRouter);

app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;