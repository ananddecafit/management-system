import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
    // res.render('index', { title: `Management app API, db on ${process.env.DB_PORT}` });
    res.status(200).send({ title: `New Management app API, db on ${process.env.DB_PORT}, name ${process.env.DB_NAME}` });
  });

export default router;