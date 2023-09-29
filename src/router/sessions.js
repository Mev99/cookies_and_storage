import { Router } from "express";
import User from "../models/user.model.js";
const sessionRouter = Router()

sessionRouter.get('/', async (req, res) => {
    res.render('login');
});

sessionRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!password || !email) {
            return console.log("password or email is missing")
        }

        let user = await User.findOne({ email: email }, { first_name: 1, last_name: 1, email: 1, age: 1, role: 1, password })
        console.log(user)
        console.log("REQ ONE: ", req.session.user)
        
        req.session.user = user

        if (req.session.user.role === "admin") {
            res.redirect('/products/admin')
        } else {
            res.redirect('/products')
        }
        res.send({payload: user})

    } catch (error) {
        console.log(error)
    }
})

sessionRouter.get('/logout', async (req, res) => {
    delete req.session.user;
    res.redirect('/sessions/login');
});

export default sessionRouter