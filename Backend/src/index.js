import e from "express";
import cors from "cors";

import indexRoutes from './routes/index.js';

const app = e();

app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(e.json());
app.use(indexRoutes);

app.listen(3000);
console.log("El server esta escuchando en el puerto:", 3000);
