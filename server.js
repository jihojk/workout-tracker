const express = require("express");
const mongoose = require("mongoose");
var morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;

// mongodb+srv://jihojk:<usuckman11>@cluster0-dux9w.azure.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(process.env.MONGODB_URI || "mongodb://jihojk:usuckman11@cluster0-dux9w.azure.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


var apiRoutes = require("./routes/api-routes");
apiRoutes(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});