import express from 'express';
import cors from 'cors';
import Routes from './routes/Routes';

const app = express();

app.use(express.json());
app.use(cors());

const routes = new Routes();

app.use('/', routes.routes());

app.listen(3000);
