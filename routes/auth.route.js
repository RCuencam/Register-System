const { Router } = require("express");
const { check } = require("express-validator");
const { registerUser, login } = require("../controllers/auth.controller");
const validationErrors = require("../middlewares/validationErrors");

const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe tener formato correcto").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validationErrors,
  ],
  registerUser
);
authRouter.post(
  "/login",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe tener formato correcto").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validationErrors,
  ],
  login
);

module.exports = authRouter;
