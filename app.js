const express = require("express");
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

//Database Connection
dbConnection();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Servidor creado en el puerto", PORT);
});
