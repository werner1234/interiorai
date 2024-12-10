/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import bodyParser from 'body-parser';
import interiorRoutes from './routes/interior.routes.js';
import cors from 'cors';

const app = express();

var corsOptions = {
  origin: [
    "http://localhost:4200",
  ]
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '5mb' }));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use('/api', interiorRoutes);

const port = process.env.PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
