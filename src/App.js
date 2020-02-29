import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Toolbar, Button, Card, CircularProgress, TextField, Typography, IconButton} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper";
import axios from 'axios';

const teamName = 'digestives';

function App() {
  const [page, setPage] = useState("room");
  const [roomId, setRoomId] = useState("");
  const [teamId, setTeamId] = useState("");

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      {page === "home" ?
        <Home goToRoom={(roomId, teamId) => {
          setRoomId(roomId);
          setTeamId(teamId);
          setPage("room");
        }}/> :
        <Room roomId={roomId} teamId={teamId} goToRoom={() => setPage("home")}/>}
    </div>
  );
}

function Home({goToRoom}) {
  const [roomId, setRoomId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinRoomError, setJoinRoomError] = useState(false);
  const timer = React.useRef(null);

  document.title = "Challengest";

  return (
    <div className="App">
      <header className="Home-Container">
        <Typography variant="h1" className="Title">Challengest</Typography>

        <img src={logo} className="App-logo" alt="logo"/>

        <LoadingButton
          variant="contained"
          color="primary"
          loading={createLoading}
          onClick={async () => {
            setCreateLoading(true);
            axios({method: 'post', url: 'http://127.0.0.1:3001/createRoom', headers: {}, data: {teamId: teamName}})
    .then(function (response) {
      setCreateLoading(false);
      goToRoom(response.data.roomId, teamName);
    })
    .catch(function (error) {
        console.log(error);
    });
          }}
          style={{marginBottom: 16}}>
          Create room
        </LoadingButton>

        <div className="LeftRight">
          <LoadingButton
            variant="contained"
            color="primary"
            loading={joinLoading}
            onClick={() => {
              const joinRoomError = roomId === "";
              setJoinRoomError(joinRoomError);

              if (!joinRoomError) {
                setJoinLoading(true);

                timer.current = setTimeout(() => {
                  setJoinLoading(false);
                  goToRoom(roomId, "participant");
                }, 3000)
              }
            }}
            style={{marginTop: 8}}>
            Join room
          </LoadingButton>

          <form noValidate autoComplete="off" onSubmit={event => event.preventDefault()}>
            <TextField
              onChange={event => setRoomId(event.target.value)}
              value={roomId}
              error={joinRoomError}
              helperText={joinRoomError ? "Please input a room Id" : ""}
              label="Room id"
              variant="outlined"
              style={{marginLeft: 16}}/>
          </form>
        </div>
      </header>
    </div>
  );
}

function LoadingButton({variant, color, loading, onClick, style, children}) {
  return (
    <div className="LoadingButton-Container">
      {loading ?
        <CircularProgress size={24} className="Loading-Circle" style={style}/> :
        <Button variant={variant} color={color} disabled={loading} onClick={onClick} style={style}>
          {children}
        </Button>
      }
    </div>
  )
}

function Room({roomId, teamId, goToRoom}) {
  const [messages, setMessages] = useState([
    {text: "alo pronto", teamId: "owner", timeStamp: "12:34"},
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"}, {
      text: "alo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo prontoalo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {
      text: "sunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactu  sunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactusunt contactu",
      teamId: "participant",
      timeStamp: "45:67"
    }, {
      text: "alo pronto",
      teamId: "owner",
      timeStamp: "12:34"
    },
    {text: "sunt contactu", teamId: "participant", timeStamp: "45:67"},
  ]);
  const [input, setInput] = useState("");

  document.title = `Room - ${roomId}`;

  return (
    <div className="Room-Container">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => goToRoom()} style={{marginRight: 16, color: "white"}}>
            <ArrowBackIcon/>
          </IconButton>

          <Typography variant="h5">
            Room {roomId} - Team {teamId}
          </Typography>
        </Toolbar>
      </AppBar>

      <Chat messages={messages}/>

      <div className="LeftRight" style={{paddingLeft: 16, paddingRight: 16}}>
        <TextField
          label="Message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          variant="outlined"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              alert(input);
              setInput("")
            }
          }}
          style={{flex: 1}}/>

        <IconButton
          onClick={() => {
            alert(input);
            setInput("");
          }}
          style={{marginLeft: 8}}>
          <SendIcon/>
        </IconButton>
      </div>
    </div>
  );
}

function Chat({messages}) {
  return (
    <Paper className="Chat-Wrapper" elevation={5}>
      <ul className="Chat-Container">
        {messages.map(ChatMessage)}
      </ul>
    </Paper>
  )
}

function ChatMessage(message) {
  const {text, teamId, timeStamp} = message;
  const alignment = teamId === "owner" ? "left" : "right";

  return (
    <div className={`ChatMessage-Wrapper ${alignment}`}>
      <Card className="ChatMessage-Container" style={{textAlign: "left"}}>
        <Typography variant="body1">
          {text}
        </Typography>

        <Typography variant="caption" style={{marginLeft: 16, marginBottom: -4, alignSelf: "flex-end", fontSize: 10}}>
          {timeStamp}
        </Typography>
      </Card>
    </div>
  );
}

export default App;
