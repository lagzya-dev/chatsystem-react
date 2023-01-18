const socketio = require("socket.io");
const express = require('express');
const http = require("http");
const path = require("path")
const app = express();
const server = http.Server(app);
const io = socketio(server);

app.set('port', 1000);
console.log(__dirname)
app.use("/static/js", express.static(__dirname.replace("\server", "") + "/build/static/js"));
app.use("/static/media", express.static(__dirname.replace("\server", "") + "/build/static/media"));
app.use("/static/css", express.static(__dirname.replace("\server", "") + "/build/static/css"));
app.get("/", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "build/index.html"))
})
app.get("/manifest.json", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "build/manifest.json"))
})
app.get("/logo192.png", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "build/logo192.png"))
})

app.get("/notify.mp3", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "build/notify.mp3"))
})

server.listen(1000, () => {
    console.log("Start server")
});
let count = 0;
let messages = [];
io.on("connection", (socket) => {
    console.log('user connection')
    socket.on("new", () => {
        
        for(let i = 0; i < messages.length; i++){
            
            console.log(messages[i])
            socket.emit("update", messages[i])
        }
    })
    socket.on("disconnect", () => {
        
        io.emit("leavePlayer", socket.id)
    })
    socket.on("submit", (text) => {
        console.log(text);
        let send = {
            id: count,
            owner: socket.id,
            msg: text
        } 
        messages.push(send);
        count++;
        io.emit("update", send)
    })
})