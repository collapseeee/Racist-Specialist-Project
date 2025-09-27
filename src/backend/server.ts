import express, { Application } from 'express';
import router from './routes/index';
import cors from 'cors';

const app: Application = express();
app.use(cors());


//  to start server type: npm start
const PORT: Number = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});

app.use('/api', router)