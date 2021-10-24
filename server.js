const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
// const path = require('path');  
// const routes = require("./routes"); 
// const db = require('./models'); 

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// app.use(routes); 

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

mongoose.connection.once('open', function() {
  console.log('Connection has been made!'); 
})
.on('error', function(error) {
  console.log("Connection Error:", error); 
}); 

require("./routes/apiRoutes")(app); 
require("./routes/viewRoutes")(app); 


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});