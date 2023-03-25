import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import owlSleep from './img/owlSleep.PNG';
import owlFlap from './img/owlFlap.PNG';
import owlAwake from './img/owlAwake.PNG';

import { StyledChatWindowContainer, StyledChatWindow, StyledButton, StyledInput, StyledMyPost, StyledMyTriangle, StyledMessage, StyledTime, StyledYourPost, StyledYourTriangle, StyledYourName, StyledImg, StyledYOwlPost, StyledOwlTriangle } from './Chat.styled';

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([{room, author: "Owl", message: 'If you need my help, just type "What do you think, Owl?"', time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}]);
    const [owlState, setOwlState] = useState("sleep");
    const [animCounter, setAnimCounter] = useState(0);

    let animId;

    const sendMessage = async () => {
        if(currentMessage !== "") {
            let messageData;

            const checkKeyWord = currentMessage.replaceAll(/\W/g, "");
            
            if(checkKeyWord.toLowerCase().includes("whatdoyouthinkowl")) {
                messageData = {
                    room,
                    author: username,
                    message: currentMessage,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                    owlRequired: true
                }
            } else {
                messageData = {
                    room,
                    author: username,
                    message: currentMessage,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                }
            }

            await socket.emit("send_message", messageData);
            setMessageList((prev) => [...prev, messageData]);
            setCurrentMessage("");

            
            // if(!animId) {
            //     animId = setInterval(() => {
            //         if(owlState === "sleep") {
            //             console.log(animCounter, owlState);
            //             setOwlState(prev => 'awake');
            //         } else {
            //             setOwlState('sleep');
            //         }
            //         setAnimCounter((prev) => prev + 1);
        
            //         if(animCounter > 5) {
            //             clearInterval(animId);
            //         } 
            //     }, 1000)
            // }
        }
    }

    const returnOwlPic = () => {
        switch(owlState) {
            case "sleep":
                return owlSleep;
            case "flap":
                return owlFlap;
            case "awake":
                return owlAwake;
        }
    }

    const animateOwl = () => {
        
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((prev) => [...prev, data])
        })
    }, [socket])

    // useEffect(() => {


    //     return () => clearInterval(animId);
    // }, [owlState])

    return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <StyledChatWindowContainer>
                <StyledChatWindow>
                    <ScrollToBottom className="chat-body">
                        {messageList.map((messageContent, index) => {
                            switch(messageContent.author) {
                                case username:
                                    return (
                                        <div key={index}>
                                            <StyledMyPost>
                                                <StyledMessage>{messageContent.message}</StyledMessage>
                                                <StyledTime>{messageContent.time}</StyledTime>
                                                <StyledMyTriangle/>
                                            </StyledMyPost>
                                        </div>
                                    )
                                case "Owl":
                                    return (
                                        <div key={index}>
                                            <StyledYOwlPost>
                                                <StyledYourName>{messageContent.author}</StyledYourName>
                                                <StyledMessage>{messageContent.message}</StyledMessage>
                                                <StyledTime>{messageContent.time}</StyledTime>
                                                <StyledOwlTriangle />
                                            </StyledYOwlPost>
                                        </div>
                                    )
                                default:
                                    return (
                                        <div key={index}>
                                            <StyledYourPost>
                                                <StyledYourName>{messageContent.author}</StyledYourName>
                                                <StyledMessage>{messageContent.message}</StyledMessage>
                                                <StyledTime>{messageContent.time}</StyledTime>
                                                <StyledYourTriangle />
                                            </StyledYourPost>
                                        </div>
                                    )
                            }
                        })}
                    </ScrollToBottom>
                    <StyledImg src={returnOwlPic(owlState)} />
                </StyledChatWindow>
                <div className="chat-footer">
                    <StyledInput
                        type="text"
                        value={currentMessage}
                        placeholder='Press enter to send'
                        onChange={(event) => {
                            setCurrentMessage(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <StyledButton onClick={sendMessage}>&#9658;</StyledButton>
                </div>
            </StyledChatWindowContainer>
        </div>
    )
}

export default Chat;