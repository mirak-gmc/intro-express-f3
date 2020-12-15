const express = require("express");
const app = express();

//DATABASE
let users = [
  {
    name: "John Doe",
    email: "John@gmail.com",
    id: 0,
  },
  {
    name: "Jane Doe",
    email: "Jane@gmail.com",
    id: 1,
  },
];

//body-parser
app.use(express.json());

//GET ALL USERS  PATH :/users METHOD : GET
app.get("/users", (req, res) => {
  res.send(users);
});

//ADD A USER  PATH :/add_user METHOD : POST
app.post("/add_user", (req, res) => {
  console.log(req.body); // { name , email }
  const newUser = req.body;
  newUser.id = Date.now();
  users = [...users, newUser];
  res.send({ msg: "User Added with success", users });
});

//EDIT USER BY ID  METHOD PUT PATH /users/:id
app.put("/users/:userId", (req, res) => {
  const id = req.params.userId;
  let userToEdit = users.find((user) => user.id.toString() === id);
  if (!userToEdit) {
    return res.status(404).send("User Not Found ");
  }
  userToEdit = { ...userToEdit, ...req.body };
  users = users.map((user) => (user.id.toString() === id ? userToEdit : user));

  //   const id = req.params.userId;
  //   const modification = req.body;
  //   users = users.map((user) =>
  //     user.id.toString() === id ? { ...user, ...modification } : user
  //   );
  res.send({ msg: "User Edited", users });
});

// DELETE A USER BY ID
app.delete("/users/:userId", (req, res) => {
  const id = req.params.userId;
  users = users.filter((user) => user.id.toString() !== id);
  res.send({ msg: "User DELETED ", users });
});

//Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`🚀 The JSON Server is Running on port ${port}`);
});
