import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js'
import cors from 'cors'


dotenv.config()
connectDB()


const app = express()
// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)


app.get('/',(req,res)=>{
    res.send({
        message : 'welcome to ecommerce'
    })
})


const PORT = process.env.PORT || 8080

app.listen(PORT , ()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode in port ${PORT}`)
})