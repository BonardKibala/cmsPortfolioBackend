const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3006;

var database = require("./config/database");

app.use(cors());

app.use(express.json());

//this is to allow our api to receive data from a client
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/',[
    require('./routes/projects')
])

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
