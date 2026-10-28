const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "backend", ts: new Date().toISOString() });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ ok: false, error: "Rota não encontrada" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ ok: false, error: "Erro interno do servidor" });
});

const port = Number(process.env.PORT) || 3333;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
