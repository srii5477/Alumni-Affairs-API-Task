import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
    const newID = alumni.length + 1;
    const newObj = {
        id: newID,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        graduationYear: req.body.year,
        contactNumber: req.body.contact,
        email: req.body.email,
        currentJob: req.body.job
    };
    alumni.push(newObj);
    const visible = {
        id: newID,
        username: req.body.username,
        name: req.body.name,
        graduationYear: req.body.year,
        contactNumber: req.body.contact,
        email: req.body.email,
        currentJob: req.body.job
    };
    res.status(201).json(visible);
});

app.get("/login", (req, res) => {
    var alumnus = alumni.find((person) => ((person['username'] == req.query.username) && (person['password'] == req.query.password)));
    if (alumnus) { 
        const finalObj = {
            id: alumnus['id'],
            username: alumnus['username'],
            name: alumnus['name'],
            graduationYear: alumnus['graduationYear'],
            contactNumber: alumnus['contactNumber'],
            email: alumnus['email'],
            currentJob: alumnus['currentJob'],
        };
        res.status(200).json(finalObj);
    } else {
        res.status(404).json({ error: "Alumnus not found!" });
    }
});

app.patch("/update/:id", (req, res) => {
    var reqObj = alumni.find((alumnus) => alumnus['id'] === parseInt(req.params.id));
    if (reqObj) {
        var original_username = reqObj['username'];
        var original_password = reqObj['password'];
        var original_name = reqObj['name'];
        var original_year = reqObj['graduationYear'];
        var original_contact = reqObj['contactNumber'];
        var original_email = reqObj['email'];
        var original_job = reqObj['job'];
        if (req.body.password) {
            reqObj['password'] = req.body.password;
        }
        else {
            reqObj['password'] = original_password;
        }
        const updatedObj = {
            id: parseInt(req.params.id),
            username: req.body.username || original_username,
            name: req.body.name || original_name,
            graduationYear: req.body.year || original_year,
            contactNumber: req.body.contact || original_contact,
            email: req.body.email || original_email,
            currentJob: req.body.job || original_job,
            
        };
        var position = alumni.findIndex((alumnus) => alumnus['id'] === updatedObj['id']);
        alumni[position] = updatedObj
        res.status(200).json(alumni[position]);
    } else {
        res.status(404).json({ error: `Alumnus with id ${req.params.id} not found!` });
    }
});

app.delete("/delete/:id", (req, res) => {
    var al = alumni.find((alumnus) => alumnus['id'] === parseInt(req.params.id));
    if (al) {
        var alIndex = alumni.findIndex((alumnus) => alumnus['id'] === parseInt(req.params.id));
        alumni[alIndex] = {};
        res.status(204).json(alumni[alIndex]);

    } else {
        res.status(404).json({ error: `Alumnus with id ${req.params.id} not found.` });
    }
});

app.get("/all", (req, res) => {
    res.status(200).json(alumni);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

var alumni = [
    {
        id: 1,
        username: "julie_white",
        password: "123",
        name: "Julie White",
        graduationYear: 2010,
        contactNumber: "012-345-6789",
        email: "julie.white@example.com",
        currentJob: "Full Stack Developer",

    }
]