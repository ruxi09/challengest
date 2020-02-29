import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import {
    AppBar,
    Toolbar,
    Button,
    Card,
    CircularProgress,
    TextField,
    Typography,
    IconButton,
    Paper,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

function App() {
    const [page, setPage] = useState("room");
    const [roomId, setRoomId] = useState("");
    const [teamName, setTeamName] = useState("");

    return (
        <div className="App">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            {page === "home" ?
                <Home goToRoom={(roomId, teamName) => {
                    setRoomId(roomId);
                    setTeamName(teamName);
                    setPage("room");
                }}/> :
                <Room roomId={roomId} teamName={teamName} goToRoom={() => setPage("home")}/>}
        </div>
    );
}

function Home({ goToRoom }) {
    const [roomId, setRoomId] = useState("");
    const [teamName, setTeamName] = useState("");
    const [createLoading, setCreateLoading] = useState(false);
    const [joinLoading, setJoinLoading] = useState(false);
    const [joinRoomError, setJoinRoomError] = useState(false);
    const timer = React.useRef(null);

    document.title = "Challengest";

    return (
        <div>
            <SetTeamDialog setTeam={setTeamName}/>

            <header className="Home-Container">
                <Typography variant="h1" className="Title">Challengest</Typography>

                <img src={logo} className="App-logo" alt="logo"/>

                <LoadingButton
                    variant="contained"
                    color="primary"
                    loading={createLoading}
                    onClick={async () => {
                        setCreateLoading(true);
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3001/createRoom',
                            headers: {},
                            data: { teamId: teamName }
                        })
                            .then(function (response) {
                                setCreateLoading(false);
                                goToRoom(response.data.roomId, teamName);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                    style={{ marginBottom: 16 }}>
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
                                axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:3001/joinRoom',
                                    headers: {},
                                    data: { teamName, roomId }
                                })
                                    .then(function (response) {
                                        setJoinLoading(false);
                                        goToRoom(roomId, teamName);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }
                        }}
                        style={{ marginRight: 8, marginTop: 8 }}>
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
                            style={{ marginLeft: 16 }}/>
                    </form>
                </div>
            </header>
        </div>
    );
}

function SetTeamDialog({ setTeam }) {
    const [open, setOpen] = useState(true);
    const [error, setError] = useState(false);
    const [teamName, setTeamName] = useState("");

    return (
        <Dialog open={open} onClose={() => alert("You have to set a name for your team.")}>
            <DialogTitle>
                <Typography>Team name</Typography>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <Typography>Set a name for your team. </Typography>
                </DialogContentText>
                <TextField
                    autoFocus
                    label="Team name"
                    fullWidth
                    margin="dense"
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                    error={error}
                    helperText={error ? "Please input a name for your team." : ""}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => {
                        const error = teamName === "";
                        setError(error);
                        if (!error) {
                            setTeam(teamName);
                            setOpen(false);
                        }
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function LoadingButton({ variant, color, loading, onClick, style, children }) {
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

function Room({ roomId, teamName, goToRoom }) {
    const [messages, setMessages] = useState([]);
    axios({ method: 'post', url: 'http://127.0.0.1:3001/getChat', headers: {}, data: { roomId } })
        .then(function (response) {
            setMessages(response.data.messages);
        })
        .catch(function (error) {
            console.log(error);
        });
    const [input, setInput] = useState("");
    const [challenge, setChallenge] = useState("");
    const [currTeam, setCurrTeam] = useState("participant");
    const [createChallengeOpen, setCreateChallengeOpen] = useState(teamName !== currTeam);
    const [seeChallengeOpen, setSeeChallengeOpen] = useState(teamName === currTeam);

    document.title = `Room - ${roomId}`;

    return (
        <div>
            <CreateChallenge
                open={createChallengeOpen}
                setOpen={setCreateChallengeOpen}
                setChallenge={setChallenge}
            />

            <SeeChallenge
                open={seeChallengeOpen}
                setOpen={setSeeChallengeOpen}
                challenge={challenge}
                onChallengeComplete={() => {
                    setCurrTeam(currTeam === "owner" ? "participant" : "owner");
                }}
            />

            <div className="Room-Container">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" onClick={() => goToRoom()} style={{ marginRight: 16, color: "white" }}>
                            <ArrowBackIcon/>
                        </IconButton>

                        <Typography variant="h5" style={{ flexGrow: 1 }}>
                            Room {roomId} - Team {teamName}
                        </Typography>

                        {teamName === currTeam &&
                        <Button color="inherit" onClick={() => setSeeChallengeOpen(true)}>
                            See challenge
                        </Button>}
                    </Toolbar>
                </AppBar>

                <Chat messages={messages} teamName={teamName}/>

                <div className="LeftRight" style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <TextField
                        label="Message"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        variant="outlined"
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:3001/sendMessage',
                                    headers: {},
                                    data: { roomId, teamName, message: input }
                                })
                                    .then(function (response) {
                                        setInput("");
                                        axios({
                                            method: 'post',
                                            url: 'http://127.0.0.1:3001/getChat',
                                            headers: {},
                                            data: { roomId }
                                        })
                                            .then(function (response) {
                                                setMessages(response.data.messages);
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }
                        }}
                        style={{ flex: 1 }}/>

                    <IconButton
                        onClick={() => {
                            axios({
                                method: 'post',
                                url: 'http://127.0.0.1:3001/sendMessage',
                                headers: {},
                                data: { roomId, teamName, message: input }
                            })
                                .then(function (response) {
                                    setInput("");
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }}
                        style={{ marginLeft: 8 }}>
                        <SendIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}


function CreateChallenge({ open, setOpen, setChallenge }) {
    const [error, setError] = useState(false);
    const [challengeText, setChallengeText] = useState("");

    return (
        <Dialog open={open} onClose={() => alert("Please set a challenge.")}>
            <DialogTitle>
                <Typography>Set challenge</Typography>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <Typography>Please set a challenge for the other team.</Typography>
                </DialogContentText>

                <TextField
                    autoFocus
                    label="Challenge"
                    fullWidth
                    margin="dense"
                    value={challengeText}
                    onChange={(event) => setChallengeText(event.target.value)}
                    error={error}
                    helperText={error ? "Please input a challenge." : ""}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    color="primary"
                    onClick={() => {
                        const error = challengeText === "";
                        setError(error);
                        if (!error) {
                            setChallenge(challengeText);
                            setOpen(false);
                        }
                    }}>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function SeeChallenge({ open, setOpen, challenge, onChallengeComplete }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Your current challenge</DialogTitle>

            <DialogContent>
                <Typography>{challenge}</Typography>
            </DialogContent>

            <DialogActions>
                <Button
                    color="primary"
                    onClick={() => setOpen(false)}
                >
                    Exit
                </Button>

                <Button
                    color="primary"
                    onClick={() => {
                        alert('ey na');
                        setOpen(false);
                        onChallengeComplete();
                    }}
                >
                    Challenge done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function Chat({ messages, teamName }) {
    return (
        <Paper className="Chat-Wrapper" elevation={5}>
            <ul className="Chat-Container">
                {messages.map(message => {
                  const alignment = message.teamName === teamName ? "right" : "left";
                  return ChatMessage(message, alignment)
                })}
            </ul>
        </Paper>
    )
}

function ChatMessage(message, alignment) {
    const { text, timeStamp } = message;

    return (
        <div className={`ChatMessage-Wrapper ${alignment}`}>
            <Card className="ChatMessage-Container" style={{ textAlign: "left" }}>
                <Typography variant="body1">
                    {text}
                </Typography>

                <Typography variant="caption" style={{
                    marginLeft: 16,
                    marginBottom: -4,
                    alignSelf: "flex-end",
                    fontSize: 10
                }}>
                    {timeStamp}
                </Typography>
            </Card>
        </div>
    );
}

export default App;
