const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jsonwebtoken = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email } = req.body;
  try {
    //Validate User
    const user = await UserModel.findOne({ email });
    if (user)
      return res.json({
        success: false,
        error: "El usuario ya se encuentra registrado",
      });

    const newUser = new UserModel(req.body);

    //Encrypt Password
    newUser.password = await bcrypt.hashSync(newUser.password, 10);
    await newUser.save();

    return res.json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validate User
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.json({ success: false, error: "El usuario no existe" });

    //Compare Password
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      return res.json({ success: false, error: "La contraseña es incorrecta" });

    //Generate Token
    const token = await jsonwebtoken.sign(
      { id: user._id, name: user.name },
      process.env.JWT_KEY
    );
    return res.json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Hubo un error al logear el usuario",
    });
  }
};

module.exports = {
  registerUser,
  login,
};
