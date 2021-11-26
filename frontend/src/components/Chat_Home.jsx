import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3005"); // point to the backend url

function Chat_Home() {
  const { id } = useParams();

  const [username, setUsername] = useState("Roya");
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
