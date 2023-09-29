import passport from "passport";
import local from "passport-local"
import User from "../models/user.model.js";
import { createHash, isValidatePassword } from '../utils.js'

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        "register",
        new localStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    let user = await User.findOne({ email: username });
                    if (user) {
                        console.log("El usuario ya existe");
                        return done(null, false);
                    }

                    if (!first_name || !last_name || !email || !age || !password) {
                        console.log("Faltan campos obligatorios");
                        return done(null, false);
                    }

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password), // Make sure createHash is defined
                    };
                    let result = await User.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done("Error al obtener el usuario " + error);
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });

    passport.use('login', new localStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false);
            }

            if (!isValidatePassword(password, user.password)) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))
}



export default initializePassport