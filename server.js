const express = require("express");
const app = express();

//logger middleware
function logger(req, res, next) {
  console.table({ method: req.method, path: req.url });
  next();
}
//app level middleware
app.use(logger);
app.use(express.static("Public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/Public/index.html");
// });

// app.get("/services", (req, res) => {
//   res.sendFile(__dirname + "/Public/services.html");
// });

// //serve the css
// app.get("/css/style.css", (req, res) => {
//   res.sendFile(__dirname + "/Public/css/style.css");
// });

//Start the Server
const port = 5000;
app.listen(port, () => {
  console.log(`🚀 The Server is Running on port ${port}`);
});
