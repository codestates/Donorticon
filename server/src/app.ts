import express, { Application, Request, Response, NextFunction } from 'express';
require('dotenv').config()

const app: Application = express();

const serverPort = process.env.SERVER_PORT || 4000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello world');
});

app.listen(serverPort, () => {
    console.log('Server running');
});


