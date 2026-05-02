const express = require("express");
const cors = require("cors");

const exerciseRoutes = require("./routes/exerciseRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const rmRoutes = require("./routes/rmRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API GymLog funcionando correctamente.",
  });
});

app.use("/api/v1/exercises", exerciseRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/rms", rmRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada.",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
