import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import { UserRouter } from "./routes/user.js"

dotenv.config()

const app = express()
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', UserRouter)

mongoose.connect('mongodb://127.0.0.1:27017/auth')

const conn = mongoose.connection

conn.once('open', ()=> {
  console.log('db connected')
})
conn.on('error', ()=>{
  console.log('db connection failed')
  process.exit()
})

app.listen(process.env.PORT, () => {
  console.log('server running')
})