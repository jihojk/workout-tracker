const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


var apiRoutes = require("./routes/api-routes");
apiRoutes(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});