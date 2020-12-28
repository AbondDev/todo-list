if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo.routes')
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, "connection error: "));
connection.once('open', () => {
  console.log('Database Connected')
});


app.use('/todos', todoRoutes)

app.listen(port, function() {
  console.log(`Serving on port: ${port}`)
})
