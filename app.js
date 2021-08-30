require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/contacts/contact.router");

app.use(express.json());
app.use("/api/contacts", userRouter);

app.get("/healtcheck", (req, res) => {
    res.json({
        success: 1,
        message: "REST API working"
    });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
