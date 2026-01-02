require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("PostgreSQL connected & synced");
  } catch (err) {
    console.error("DB error:", err);
  }
})();


const port = process.env.PORT||5000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
