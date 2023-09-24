import { Router } from "express";
const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const {email} = req.session.user

    res.render('products', {email})
})

productRouter.get("/admin", async (req, res) => {
    const {email} = req.session.user

    res.render('productsAdmin', {email})
})
export default productRouter