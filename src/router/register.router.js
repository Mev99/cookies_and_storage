import { Router } from "express"
import User from "../models/user.model.js"
import passport from "passport"
import { createHash, isValidatePassword } from "../utils.js"
const registerRouter = Router()

registerRouter.get("/", async (req, res) => {
    res.render('register')
})

registerRouter.get('/failregister', async (req, res) => {
    res.render('failregister')
})

registerRouter.post("/", passport.authenticate("register", {failureRedirect: "/sessions/register/failregister"}), async (req, res) => {
    
        const { first_name, last_name, email, age, password } = req.body
        console.log(req.body)
        
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send('Faltan datos.');
        }
        // const hashedPassword = createHash(password);
        
        const createUser = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: "user"
        })

        // res.write({payload: createUser})
        res.redirect("http://localhost:8080/sessions/login")

        res.send({ status: "success", payload: createUser });
})

export default registerRouter