const PORT = process.env.PORT || 3005;
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors"); 
const { Server } = require("socket.io"); 

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002", // pointing to the front url
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // console.log(`server part message ${data.key}`);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const questionsRouter = require('./routes/questions');


app.use('/api/users', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/api/questions', questionsRouter);

app.get("/api/authentication") // how do you kow if the user is logged in if you need to refresh? 
app.post("/api/login") // why not get again ????/ insert and return back the user object 
app.post("/api/register")


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
