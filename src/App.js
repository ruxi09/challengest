import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function App() {
  const [roomId, setRoomId] = useState("");
  const [joinRoomError, setJoinRoomError] = useState(false);

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      <header className="App-header">
        <h className="title">Challengest</h>

        <img src={logo} className="App-logo" alt="logo"/>

        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("created")}
          style={{marginBottom: 16}}>
          Create room
        </Button>

        <div className="leftRight">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const joinRoomError = roomId === "";
              setJoinRoomError(joinRoomError);
              if (!joinRoomError) {
                alert(roomId)
              }
            }}
            style={{marginRight: 8}}>
            Join room
          </Button>

          <form noValidate autoComplete="off" onSubmit={event => event.preventDefault()}>
            <TextField
              onChange={event => setRoomId(event.target.value)}
              value={roomId}
              error={joinRoomError}
              helperText={joinRoomError ? "Please input a room Id" : ""}
              label="Room id"
              variant="outlined"
              style={{marginLeft: 8}}/>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
