import styled from "styled-components";

export const StyledChatWindowContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledChatWindow = styled.div`
    background-color: #FFF7E3;
    width: 500px;
    height: 500px;
    border-radius: 20px;
    border-style: dashed;
    padding:5px;
    border: solid;
`

export const StyledInput = styled.input`
    border-radius: 5px;
    margin: 10px 0;
`

export const StyledButton = styled.button`
    border-radius: 5px;
    margin: 10px 0;
`

export const StyledMyPost = styled.div`
    background-color: #53DA32;
    width: 200px;
    padding: 10px;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    left: 50%;
    margin: 10px 0;
`

export const StyledMyTriangle = styled.div`
    background-color: #53DA32;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 80%;
    top: 30%;
    z-index: -1;
    transform: rotate(45deg);
`

export const StyledMessage = styled.p`
    word-wrap: break-word;
`

export const StyledTime = styled.p`
    font-size: 0.8em;
    height: 5px
`

export const StyledYourPost = styled.div`
    background-color: #FFFFFF;
    width: 200px;
    padding: 10px;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    left: 5%;
    margin: 10px 0;
`

export const StyledYourTriangle = styled.div`
    background-color: #FFFFFF;
    width: 50px;
    height: 50px;
    position: absolute;
    left: -5%;
    top: 30%;
    z-index: -1;
    transform: rotate(45deg);
`

export const StyledYourName = styled.p`
    color: #8C8C8C;
    font-size: 0.8em;
    position: absolute;
    left: 5%;
    top: -5%;
    z-index: 1;
`

export const StyledYOwlPost = styled.div`
    background-color: #B8793E;
    width: 200px;
    padding: 10px;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    left: 5%;
    margin: 10px 0;
`

export const StyledOwlTriangle = styled.div`
    background-color: #B8793E;
    width: 50px;
    height: 50px;
    position: absolute;
    left: -5%;
    top: 30%;
    z-index: -1;
    transform: rotate(45deg);
`

export const StyledImg = styled.img`
    position: relative;
    scale: 40%;
    left: -60%;
    top: -35%;
`