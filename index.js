const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

//listening on port
const port = 3000;
app.use(express.json()); //middleware untuk parsing json
app.use("/api", userRoutes); //Gunakan route dengan prefix '/api' => endpoint => '/api/users'

app.listen(port, () => {
  console.log(`App Run In Port ${port}`);
});
