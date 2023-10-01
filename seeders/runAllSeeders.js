require("dotenv").config();

async function runAllSeeders() {
  // Seeders:

  await require("./userSeeder")();
  await require("./articleSeeder")();
  await require("./commentSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
