import express from 'express'
import taskRoute from './routes/taskRoute.js'
const app = express();
const port = 1000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', taskRoute)


app.get('/',(req,res)=> res.send('Server is ready'))

app.listen(port, ()=> console.log(`server started on port: ${port}`))