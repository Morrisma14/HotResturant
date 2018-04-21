var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

const maxTables = 5;

var app = express();
var PORT = process.env.PORT || 3000;

var reservations = [];
var waitlist = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/api/tables", (req, res) => {
    res.json(reservations);
});

app.get("/api/waitlist", (req, res) => {
    res.json(waitlist);
});

app.post("/api/tables", function(req, res) {
    if(reservations.length < maxTables) {
        reservations.push(req.body);
        console.log("Reservations updated:");
        console.log(reservations);
        return res.end("true");
    }
    waitlist.push(req.body);
    console.log("Waitlist updated:");
    console.log(waitlist);
    return res.end("false");
});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

