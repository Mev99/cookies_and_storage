import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//routers
import sessionRouter from "./router/sessions.js";
import registerRouter from "./router/register.router.js";
import productRouter from "./router/products.router.js";

const app = express()

mongoose.connect("mongodb+srv://Mev:1972@cluster0.kxayelo.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to DB')
    })
    .catch(error => {
        console.error('error connecting to DB', error)
    })

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Mev:1972@cluster0.kxayelo.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600,
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: true,
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


//views
app.engine(
    "handlebars",
    engine({
        extname: "handlebars",
        defaultLayout: false,
        layoutsDir: "views/layouts/"
    })
);
app.set("view engine", "handlebars")
app.set("views", __dirname + '/views')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routers
app.use("/sessions/login", sessionRouter)
app.use("/sessions/register", registerRouter)
app.use("/products", productRouter)


app.listen(8080, () => {
    console.log(`listening on what ever port you choose homie`)
})
