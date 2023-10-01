const User = require("../models/User");
const bcrypt = require("bcryptjs");

const usersData = [
  {
    firstname: "Martin",
    lastname: "Pintos",
    username: "MPintos",
    email: "mpintos@gmail.com",
    password: "123",
  },
  {
    firstname: "Martin",
    lastname: "Borba",
    username: "MBorba",
    email: "mgrillo@gmail.com",
    password: "123",
  },
  {
    firstname: "User",
    lastname: "Name",
    username: "User",
    email: "User@user.com",
    password: "123",
  },
];

const seedUsers = async () => {
  try {
    console.log("Ejecutando seeder de usuarios...");

    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      await User.create(userData);
    }

    console.log("Usuarios creados con éxito");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
};

module.exports = seedUsers;
