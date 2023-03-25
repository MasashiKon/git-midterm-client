import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import Chat from './Chat'

import { StyledLogin, StyledLoginForm, StyledInput, StyledButton } from './App.styled';

const socket = io.connect("https://react-midterm-server.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("123");
  const [showChat, setShowChat] = useState(false);
  const [usernameList, setUsernameList] = useState([]);
  const [usernamePlaceHolder, setUsernamePlaceHolder] = useState("Your name");
  
  const joinRoom = () => {
    if(username !== "" && room !== "") {
      if(usernameList.includes(username)) {
        setUsernamePlaceHolder("Name is already used");
        setUsername("");
      } else {
        socket.emit("join_room", {room, username});
        setShowChat(true);
        setUsernameList((prev) => [...prev, username])
      }
    }
  }

  useEffect(() => {
    socket.on("get_usernamelist", (data) => {
      setUsernameList((prev) => [...prev, ...data])
    });
  }, [socket])

  return (
    <div className="App">
      {
        !showChat ? (
          <StyledLogin>
            <StyledLoginForm>
              <h2>What do you think, Owl?</h2>
              <h4>Join A Chat</h4>
              <StyledInput
                type="text"
                placeholder={usernamePlaceHolder}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                value={username}
              />
              <StyledInput
                type="text"
                placeholder="Room ID"
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value)
                }}
              />
              <StyledButton onClick={joinRoom}>Join A Room</StyledButton>
            </StyledLoginForm>
          </StyledLogin>
        ) :
        (
          <Chat socket={socket} username={username} room={room}/>
        )
      }


      
    </div>
  );
}

export default App;
