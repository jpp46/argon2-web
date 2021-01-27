'use strict';

var http = require("http");
var pathUtils = require("path");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 5000, appDir = pathUtils.resolve(__dirname, "./");

app.use(express.static(appDir));

app.get("*", function(req, res) {
    res.sendfile(pathUtils.resolve(appDir, "index.html"));
});

http.createServer(app).listen(PORT, function() {
    console.log("Express server listening on port " + PORT);
    console.log("http://localhost:" + PORT);
});