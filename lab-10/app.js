const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const users = require('./users');
const app = express();
const bcrypt = require('bcryptjs');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    name: 'AuthCookie',
    secret: 'This is the secret everyone is looking for.',
    resave: false,
    saveUninitialized: true
    
}));

const checkUserStatus =  (req) => {
    return (!!req.session.user);
};

const checkUserValidity =  (req) => {
    const username = req.body['username'];
    const password = req.body['password'];

    if (username === undefined || password === undefined) {
        return false;
    }

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.username === username && bcrypt.compareSync(password, user.hashedPassword)) {
            return user;
        }
    }

    return false;
};

// logging middleware
const middlewarelogger =  (req, res, next) => {
    console.log(`[${new Date().toUTCString()}]: ${req.method}\t${req.originalUrl}\t${checkUserStatus(req) ? '(Authenticated User)' : '(Non-Authenticated User)'}`);
    next();
};
app.use(middlewarelogger);


app.get('/', async  (req, res) => {
    if (checkUserStatus(req)) {
        res.redirect('/private');
    } else {
        res.render('login', {title: "Login"});
    }
});


// authenticating the middleware
app.use('/private', async (req, res, next) =>{
    if (checkUserStatus(req)) {
        next();
    } else {
        res.status(403);
        res.render('error', {title: "Error"});
    }
});

app.get('/private',  async(req, res, next) => {
    res.render('userDetails', {title: "Details of the user", user: req.session.user});
});

app.post('/login', async (req, res) => {
    if (checkUserStatus(req)) {
        res.redirect('/private');
    }
    const user = checkUserValidity(req);
    if (user) {
        req.session.user = user;
        res.redirect('/private');
    } else {
        res.status(401);
        res.render('login', {title: "Error", error: "You have either entered an invalid username or password"});
    }
});

app.get('/logout', async (req, res) =>{
    req.session.destroy(function (err) {
        res.render('logout', {title: "Logout"});
        
    })
});

app.use("*", (req, res) => {
    res.status(404).json({error: "Route not found"});
});

const port = 3000;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});