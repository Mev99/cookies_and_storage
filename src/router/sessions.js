import { Router } from "express";
import User from "../models/user.model.js";
import passport from "passport"
import { createHash, isValidatePassword } from "../utils.js"
const sessionRouter = Router()

sessionRouter.get('/', async (req, res) => {
    res.render('login');
});

sessionRouter.get('/logout', async (req, res) => {
    delete req.session.user;
    res.redirect('/sessions/login');
});

sessionRouter.get('/faillogin', async (req, res) => {
    res.render('faillogin')
})

sessionRouter.get('/github', passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {
    
})

sessionRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/faillogin" }), async (req, res) => {
    req.session.user = req.user
    res.redirect("/")
})


// sessionRouter.post("/", async (req, res) => {
//     try {
//         const { email, password } = req.body

//         if (!password || !email) {
//             return console.log("password or email is missing")
//         }

//         let user = await User.findOne({ email: email }, { first_name: 1, last_name: 1, email: 1, age: 1, role: 1, password })
//         console.log(user)
//         console.log("REQ ONE: ", req.session.user)

//         req.session.user = user

//         if (req.session.user.role === "admin") {
//             res.redirect('/products/admin')
//         } else {
//             res.redirect('/products')
//         }

//     } catch (error) {
//         console.log(error)
//     }
// })



// sessionRouter.post("/", async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" });

//     const user = await User.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1 });

//     if (!user) {
//         return res.status(400).render("login", { error: "Usuario no encontrado" });
//     }

//     if (!isValidatePassword(user, password)) {
//         return res.status(401).render("login", { error: "Error en password" });
//     }

//     req.session.user = {
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         age: user.age
//     };

//     res.redirect("/products");
// });




sessionRouter.post("/", passport.authenticate("login", { failureRedirect: "/faillogin" }), async (req, res) => {
    if (!req.session.user) {
        return res.status(400).send("Usuario no encontrado")
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    }
    res.send({ status: "success", payload: req.user })
}
)


export default sessionRouter