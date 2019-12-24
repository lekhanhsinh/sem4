import express from "express";
import path from "path";

const router = express.Router();

router.get("*", (req, res) => {
    res.sendFile(path.resolve("front-end-admin/index.html"));
});

export default router;