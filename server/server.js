const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const axios = require('axios');
const jwt = require("jsonwebtoken");
const key = "ajwndkuhanw9dkawgdk2hawdBuyugad0";

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017/calendar";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const users = new mongoose.Schema({
    user_name: 'string',
    email: 'string',
    role: 'string',
    department: 'string'
})
const events = new mongoose.Schema({
    event_name: 'string',
    event_desc: 'string',
    from_date: 'date',
    to_date: 'date'
})

const event = mongoose.model('events_details', events, 'events_details')

const user = mongoose.model('credentials', users, 'credentials')

app.get('/', (req, res) => {
    user.find()
        .then((use) => {
            res.send(use);
        })
        .catch((err) => { console.log(err) })
})

app.get('/login', async (req, res) => {
    const token = req.headers.authorization;
    var tokeninfo;
    const data = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
        .then((resp) => {
            return resp.data;
        })
        .catch((err) => {
            console.log(err);
        });
    const email = data.email;
    user.findOne({ email: email })
        .then((response) => {
            if (response == null) {
                res.send({ message: "Unauthorised Access" });
            } else if (response.statusCode == 400) {
                console.log("Unauthorised Access");
            } else {
                try {
                    const token = jwt.sign(
                        {
                            username: response.user_name,
                            email: response.email,
                            department: response.department,
                            role: response.role,
                        },
                        key,
                        { expiresIn: "12h" }
                    );
                    res.send(token);
                } catch (error) {
                    console.log(error)
                }
            }
        })


})

app.get('/events', (req, res) => {

    event.find()
        .then((use) => {
            res.send(use);
        })
        .catch((err) => { console.log(err) })
})


app.post('/eventsdetails', (req, res) => {
    const eventname = req.body.eventName;
    const eventdesc = req.body.eventDesc;
    const fromdate = req.body.fromDate;
    const todate = req.body.toDate;

    const newEvent = new event({
        event_name: eventname,
        event_desc: eventdesc,
        from_date: fromdate,
        to_date: todate
    });

    newEvent.save()
        .then(() => {
            res.status(200).send('Event saved successfully');
        })
        .catch(err => {
            console.error('Error saving event:', err);
            res.status(500).send('Error saving event');
        });
});


app.post('/getUser', (req, res) => {
    const getToken = req.body.token;
    try {
        const data = jwt.verify(getToken, key);
        return res.send(data);
    } catch (error) {
        console.log("error");
        return res.status(400).json({ error: "Invalid Token" });
    }
})



app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
});