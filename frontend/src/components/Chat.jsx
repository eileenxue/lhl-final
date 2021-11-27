import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.scss";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3005"); // point to the backend url

function Chat(props) {
  const { room, key } = props;

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [test, setTest] = useState();
  // const [user,setUser] = useState({});
  const baseURL = "http://localhost:3005";

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log("chat box receive data?????", data);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  // useEffect(()=>{
  const storedUser = localStorage.getItem("storedUser");
  if (!storedUser) {
    window.location.href = "/login";
    return;
  }
  const parsedUser = JSON.parse(storedUser);
  // setUser(parsedUser);
  // console.log(" chaaaaaatttttt parsed user", parsedUser.id )
  // axios.get(`${baseURL}/dashboard/student/${parsedUser.id}`)
  // .then((result)=>{
  //   setTest(result.data.test)
  //   console.log("test:", result.data.test);
  // })
  // }, [])

  const username = parsedUser.first_name;
  socket.emit("join_room", "room");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log(socket.id);
      const messageData = {
        key: socket.id,
        // here is hard coded room. should use redux ;
        room: "room",
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
    // console.log("user is ", username)
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
