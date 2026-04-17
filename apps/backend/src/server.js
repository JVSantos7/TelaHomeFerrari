const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "backend", ts: new Date().toISOString() });
});

const port = Number(process.env.PORT) || 3333;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

