const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./connection/conn");

const User = require("./routes/user");
const Book = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json());
app.use("/ap1/v1", User);
app.use("/ap1/v1", Book);
app.use("/ap1/v1", Favourite);
app.use("/ap1/v1", Cart)
app.use("/ap1/v1", Order);

//Creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});