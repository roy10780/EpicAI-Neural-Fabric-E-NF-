const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const agentsRouter = require("./routes/agents");
app.use("/api/agents", agentsRouter);

app.get("/", (req, res) => {
  res.send("EpicAI Neural Fabric Backend 🚀");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
