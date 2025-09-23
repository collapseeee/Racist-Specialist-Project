import express, { Application } from 'express';
import router from './routes/index';

const app: Application = express();
app.use(express.json());


//  to start server type: npm start
const PORT: Number = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});

app.use('/api', router)