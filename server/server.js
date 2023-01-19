const socketio = require("socket.io");
const express = require('express');
const http = require("http");
const path = require("path")
const app = express();
const server = http.Server(app);
const io = socketio(server);

app.set('port', 5000);
console.log(__dirname)
app.get("/", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "build/index.html"))
})

app.get("/static/js/main.b46b634c.js", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "/build/static/js/main.b46b634c.js"))
})
app.get("/static/css/main.59f3464a.css", (requst, response) => {
    response.sendFile(path.join(__dirname.replace("\server", "") + "", "/build/static/css/main.59f3464a.css"))
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

server.listen(5000, () => {
    console.log("Start server")
});
let count = 0;
let messages = [];
io.on("connection", (socket) => {
    console.log('user connection')
    socket.on("new", () => {
         socket.emit("loadMsg",messages)

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