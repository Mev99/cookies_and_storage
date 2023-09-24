import { Router } from "express";
import User from "../models/user.model.js";
const sessionRouter = Router()

sessionRouter.get('/login', async (req, res) => {
    res.render('login');
});



sessionRouter.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        const user = new User({ first_name, last_name, email, age, password })
        await user.save
        res.redirect("/sessions/login")

    } catch (error) {
        console.log(error)
    }
})

sessionRouter.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")

    }
    const { first_name, last_name, email, age, password } = req.session.user
    res.render("profile", { first_name, last_name, email, age })
})


export default sessionRouter