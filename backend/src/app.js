const express = require("express");

const app = express(); //creating a new express js server
const connectDB = require("./config/database");

const User = require("./models/user");

app.use(express.json()); //this is used to parse incoming json data(request body) to be specific the json data attached in the request is parsed into javascript object

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "joe",
  //   lastName: "doe",
  //   emailId: "joedoe@gmail.com",
  //   password: "joeDoe@1234",
  // };
  //creating a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added successfully");
  } catch (e) {
    console.error("error saving user", e);
  }
});

//get all users /user
app.get("/feed", async (req, res) => {
  try {
    await User.find({}).then((users) => {
      res.send(users);
    });
  } catch (error) {
    console.error("error getting users", e);
  }
});

//get specific users /feed
app.get("/user", async (req, res) => {
  try {
    await User.find({ emailId: req.body.emailId }).then((user) => {
      res.send(user);
    });
  } catch (error) {
    console.error("error getting users", e);
  }
});

//delete user /user
app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body._id);
    res.send("user deleted successfully");
  } catch (error) {
    console.error("error getting users", e);
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
