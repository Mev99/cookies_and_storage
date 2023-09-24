import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";

import sessionRouter from "./router/sessions.js";

const app = express()

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

app.set("view engine", "handlebars")
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/sessions", sessionRouter)

app.listen(8080, () => {
    console.log(`listening on what ever port you choose homie`)
})


// Ajustar nuestro servidor principal para trabajar con un sistema de login.

// Aspectos a incluir

// -Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login.
// -Una vez completado el login, realizar la redirección directamente a la vista de productos.
// -Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario

// -Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo
// -Todos los usuarios que no sean admin deberán contar con un rol “usuario”.
// -Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login                             Formato

// Link al repositorio de Github sin node_modules

// Sugerencias

// Recuerda que las vistas son importantes, más no el diseño, concéntrate en la funcionalidad de las sesiones antes que en la presentación.
// Cuida las redirecciones a las múltiples vistas.   
