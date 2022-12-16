const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Conexión a la BD exitosa");
  } catch (error) {
    console.log("Hubo un error al conectarse a la BD", error);
  }
};

module.exports = dbConnection;
