const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateMiddleware = require("./middleware/auth");
const searchRoute = require('./routes/searchRoute');

dotenv.config();
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use('/search', searchRoute);

app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})




app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening to port ${process.env.PORT || 4000}`);
})