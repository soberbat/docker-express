const express = require("express");
const app = express();
const port = 3000;

app.get("/hi", (req, res) => {
  res.send("Hi my name");
});

app.listen(port, () => {
  console.log(`Server is dfkfk at http://localhost:${port}`);
});
