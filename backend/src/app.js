const express = require("express");

const app = express(); //creating a new express js server
const connectDB = require("./config/database");

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "joe",
    lastName: "doe",
    emailId: "joedoe@gmail.com",
    password: "joeDoe@1234",
  };
  //creating a new instance of the user model
  const user = new User(userObj);

  try {
    await user.save();
    res.send("user added successfully");
  } catch (e) {
    console.error("error saving user", e);
  }
});

connectDB()
  .then(() => {
    console.log("DB is connected");
    app.listen(3000, () => {
      console.log("server is listening on 3000");
    });
  })
  .catch((e) => {
    console.error("database is not connected", e);
  });
