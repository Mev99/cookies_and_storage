import { Router } from "express"
import User from "../models/user.model.js"
const registerRouter = Router()

registerRouter.get("/", async (req, res) => {
    res.render('register')
})


registerRouter.post("/", async (req, res) => {
    
        const { first_name, last_name, email, age, password } = req.body
        console.log(req.body)
        
        // const user = new User({ first_name, last_name, email, age, password })
        const createUser = await User.create({
            first_name,
            last_name,
            email,
            age,
            password,
            role: "user"
        })

        // res.write({payload: createUser})
        res.redirect("http://localhost:8080/sessions/login")

 
})

export default registerRouter