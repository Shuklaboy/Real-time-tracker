const express =require('express');
const app = express();
const path=require("path");

//lines of code required for setting up socketio
const http= require("http"); //socket io runs on http sever
const socketio= require("socket.io");
const server= http.createServer(app); //main method
const io = socketio(server); //calling socket function and we are passing server on it
//till here

//ejs code
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

io.on("connection", function (socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    }); 
    
    socket.on("disconnect", function() {
        io.emit("user-disconnect", socket.id);
    });
});


app.get("/", function (req, res) {  //creating route
    res.render("index");
});

server.listen(4000);