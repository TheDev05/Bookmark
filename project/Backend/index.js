const express = require("express");
const app = express();
const port = 5000;

const mongoDB = require("./db");

const cors = require("cors");
app.use(
  cors({
    origin: ["https://bookmark-frontend-three.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
 
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/Profile"));

app.get("/", (req, res) => {
  res.json("Hello");
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
