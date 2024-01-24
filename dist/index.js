var express = require('express');
var port = 3000;
var app = express();
app.use(express.json());
var users = [{
        name: "Jade",
        age: "21",
        haveAccess: true,
        kidneys: [{ healthy: false }]
    }];
function accessCheck(i) {
    return users[i].haveAccess;
}
app.get("/", function (req, res) {
});
app.listen(port);
