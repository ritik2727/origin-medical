const express = require("express");
const morgan = require("morgan");
const path = require('path');
const colors = require("colors");
const userRouter = require('./routes/userRoutes')
const imageRouter = require('./routes/imageRoutes')
const cors = require('cors');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require('dotenv').config()
const app = express();

app.use(express.static(path.join(__dirname, 'Images')));
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("Server running");
});

app.use('/api/users',userRouter);
app.use('/api/images',imageRouter);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`.cyan);
});
