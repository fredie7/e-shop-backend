import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
// import expressValidator from 'express-validator';
import authRoute from './routers/auth';
import userRoutes from './routers/user';

const app = express();

app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
// app.use(expressValidator())

app.use('/api/v1/auth', authRoute);
app.use('/api/v1', userRoutes);

app.get('/', (req,res)=> res.status(200).json({message: 'app running....'}))

const PORT = process.env.PORT || 9000
app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})

export default app;