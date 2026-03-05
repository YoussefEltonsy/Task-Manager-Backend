import cookieParser from "cookie-parser";
import taskRoute from './routes/taskRoute.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import dotenv from 'dotenv'
import express from 'express'



dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', taskRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)





export default app;