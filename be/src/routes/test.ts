import express, { Request, Response } from 'express';
import db from "../db/db";

const router = express.Router();

// router.post("/post", async (req, res) => {
//     const { title } = req.body;
//     try {
//       const test = await db("test").insert({ title });
//       res.status(201).send(test);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   });


router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("test");
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;