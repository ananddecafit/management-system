import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: `Management app API, db on ${process.env.DB_PORT}` });
  });

export default router;