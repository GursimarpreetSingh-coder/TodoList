const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let items = [];

app.get("/", function (req, res) {
    res.render("list", { ejes: items });
});

app.post("/", function (req, res) {
    let item = {
        text: req.body.ele1,
        priority: req.body.priority
    };
    items.push(item);
    res.redirect("/");
});

app.post("/delete", function (req, res) {
    const id = req.body.id;
    items.splice(id, 1);
    res.redirect("/");
});

app.post("/edit", function (req, res) {
    const id = req.body.id;
    items[id].text = req.body.newText;
    res.redirect("/");
});

app.get("/filter/:type", (req, res) => {
    const filtered = items.filter(t => t.priority === req.params.type);
    res.render("list", { ejes: filtered });
});

app.listen(8000, function () {
    console.log("Server started on port 8000");
});
