const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "exercise-1", "client")));

app.use(express.json());

app.engine("handlebars", exphbs({ defalutLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
