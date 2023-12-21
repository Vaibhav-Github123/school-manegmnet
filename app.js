require ('dotenv').config();
require ('./config/db');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./router/index');
const MongoStore = require('connect-mongo');
const seed = require('./seeder/seeder');
const path = require('path');

seed.seedAdmin();

const store = MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    ttl:1000 * 24 * 24 * 60
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,'views'));

app.use(cookieParser());
const oneDay = 1000 * 24 * 24 * 60;
app.use(session({
    secret:process.env.SECRET_KEY,
    saveUninitialized:false,
    resave:false,
    store:store,
    cookie:({
        maxAge:oneDay,
        httpOnly:true,
        secure:false
    })
}));

app.use(express.static('public'))
app.use('/public/', express.static('public'))

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`server is running on PORT:${PORT}`);
});