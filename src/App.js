import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

function App() {
  const [page, setPage] = useState("home");
  const [roomId, setRoomId] = useState("");

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      {page === "home" ?
        <Home goToRoom={(roomId) => {
          setRoomId(roomId);
          setPage("room");
        }}/> :
        <Room roomId={roomId} goToRoom={() => setPage("home")}/>}
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
        <h className="Title">Challengest</h>

        <img src={logo} className="App-logo" alt="logo"/>

        <LoadingButton
          variant="contained"
          color="primary"
          loading={createLoading}
          onClick={() => {
            setCreateLoading(true);

            timer.current = setTimeout(() => {
              setCreateLoading(false);
              goToRoom("new")
            }, 3000);
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
                  goToRoom(roomId)
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

function Room({roomId, goToRoom}) {
  document.title = `Room - ${roomId}`;

  return (
    <div className="Room-Container">
      <h>Welcome to {roomId}</h>
      <div>
        <Button onClick={() => goToRoom()} variant="contained">
          Back
        </Button>
      </div>
    </div>);
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

export default App;
