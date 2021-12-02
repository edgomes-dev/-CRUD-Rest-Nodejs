import express from 'express'
import mongoose from 'mongoose'
require('dotenv').config()

import personRoutes from './routes/personRoutes';

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.get('/', (req, res) =>
{
    res.send('CRUD API-Nodejs')
});

app.use('/person', personRoutes);


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@apicluster.qdshx.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectou ao mongoDB")
    const port = 3000;
    app.listen(port)
})
.catch((err) => console.log(err));