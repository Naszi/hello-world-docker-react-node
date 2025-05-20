import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = 5000;

const pool = new Pool();

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Engedélyezett HTTP metódusok
    allowedHeaders: ['Content-Type', 'Authorization'] // Engedélyezett fejlécek
}));

app.get("/api/hello", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT message FROM messages LIMIT 1");
        if (result.rows.length > 0) {
            res.json({ message: result.rows[0].message });
        } else {
            res.json({ message: "Nincs üzenet az adatbázisban." });
        }
    } catch (err) {
        console.error("Adatbázis hiba:", err);
        res.status(500).json({ message: "Hiba az adatbázis lekérdezés során." });
    }
});

app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
});
