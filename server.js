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

app.post("/api/tables", (req, res)=>{
    if(reservations.length < maxTables) {
        reservations.push(req.body);
        return res.end(true);
    }
    waitlist.push(req.body);
    return res.end(false);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

