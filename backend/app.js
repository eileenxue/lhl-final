require("dotenv").config();

const PORT = process.env.PORT || 3005;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");


app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // point to the front url
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    // console.log(Object.keys(data.id));
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // console.log("cheeeccccccking send_message",data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const messageRouter = require('./routes/message');
const questionsRouter = require('./routes/questions');
const appointmentsRouter = require('./routes/appointments');
const bookingRouter = require('./routes/booking');


const deleteRouter = require('./routes/delete');
const editRouter = require('./routes/edit');
const examRouter = require('./routes/exam');


app.use('/api/users', usersRouter(db));
app.use('/api/tests', testsRouter(db));
app.use('/api/dashboard', dashboardRouter(db));
app.use("/api/login", loginRouter(db));
app.use("/api/logout", logoutRouter(db));
app.use("/api/register", registerRouter(db));
app.use("/api/message", messageRouter(db));
app.get("/api/authentication") // how do you kow if the user is logged in if you need to refresh? 
app.use("/api/questions", questionsRouter(db));
app.use("/api/appointments", appointmentsRouter(db));
app.use("/api/booking", bookingRouter(db));
app.use("/api/delete", deleteRouter(db));
app.use("/api/edit", editRouter(db));
app.use("/api/exam", examRouter(db));




server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
