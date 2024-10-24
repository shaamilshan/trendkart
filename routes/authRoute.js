import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {registerController,loginController,testController, forgotPasswordController} from '../controllers/authController.js'

const router  = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)

router.post('/forgot-password',forgotPasswordController)

router.get('/test',requireSignIn,isAdmin,testController)


// protected 
router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

export default router