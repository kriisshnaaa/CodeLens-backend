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


const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
