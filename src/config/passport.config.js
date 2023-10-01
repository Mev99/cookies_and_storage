import passport from "passport";
import local from "passport-local"
import User from "../models/user.model.js";
import { createHash, isValidatePassword } from '../utils.js'
import  GitHubStrategy  from 'passport-github2'

const localStrategy = local.Strategy

// const initializePassport = () => {
//     passport.use(
//         "register",
//         new localStrategy(
//             { passReqToCallback: true, usernameField: "email" },
//             async (req, username, password, done) => {
//                 const { first_name, last_name, email, age } = req.body;
//                 try {
//                     let user = await User.findOne({ email: username });
//                     if (user) {
//                         console.log("El usuario ya existe");
//                         return done(null, false);
//                     }

//                     if (!first_name || !last_name || !email || !age || !password) {
//                         console.log("Faltan campos obligatorios");
//                         return done(null, false);
//                     }

//                     const newUser = {
//                         first_name,
//                         last_name,
//                         email,
//                         age,
//                         password: createHash(password), // Make sure createHash is defined
//                     };
//                     let result = await User.create(newUser);
//                     return done(null, result);
//                 } catch (error) {
//                     return done("Error al obtener el usuario " + error);
//                 }
//             }
//         )
//     )



    const initializePassport = () => {
        passport.use("github", new GitHubStrategy({
            clientID: "Iv1.80a9ef7a24331318",
            clientSecret: "ad1cf62eef633a697ffed7a8da4db26b7691f6be",
            callbackUrl: "http://localhost:8080/sessions/login/githubcallback"

        }, async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile)
                let user = await User.findOne({ email: profile._json.email })
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: "",
                        email: email._json.email,
                        password: ""
                    }
                    let result = await userService.create(newUser)
                    done(null, result)
                }else{
                    done(null, user)
                }
            } catch (error) {
                console.log(error)
            }
        }
        ))
    }





    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id);
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
// }



export default initializePassport