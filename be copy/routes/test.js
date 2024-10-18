var express = require('express');
var router = express.Router();
const db = require("../db/db.js");

// router.post("/", async (req, res) => {
//     const { title } = req.body;
//     try {
//       const test = await db("test").insert({ title });
//       res.status(201).send(test);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


router.get("/", async (req, res) => {
    try {
        const result = await db.select("*").from("test");
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;