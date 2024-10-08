const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./router/router");

app.use("/", routes);

app.listen(3000, () => {
  console.log("SERVIDOR CORRIENDO EN PUERTO: " + 3000);
});
