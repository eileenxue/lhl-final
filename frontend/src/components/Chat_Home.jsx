import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import axios from 'axios';
const socket = io.connect("http://localhost:3005"); // point to the backend url
const baseURL = 'http://localhost:3005';

function Chat_Home() {
  const [user,setUser] = useState({});
  const [test, setTest] = useState("");
 
  const { id } = useParams();

  const [username, setUsername] = useState(user.first_name);
  const [room, setRoom] = useState(id || "123");
  const [showChat, setShowChat] = useState(true);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(socket.id);
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    joinRoom();
  }, []);


  useEffect(()=>{ 
    const storedUser = localStorage.getItem('storedUser');
    if (!storedUser) {
      window.location.href = "/login";
    }; 
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    // here is hard coded, it should be exam_id;
    axios.get(`${baseURL}/dashboard/1111`) 
    .then((result)=>{
      setTest(result.data.test)
      console.log("test:", result.data.test);
    })
  }, [])

  
  console.log("here:", room);
  return (
    <div className="chat-home">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat_Home;
