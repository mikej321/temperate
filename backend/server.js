const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateMiddleware = require("./middleware/auth");
const searchRoute = require('./routes/searchRoute');

dotenv.config();
const app = express();

const TASK_SECRET = process.env.TASK_SECRET;

const isDev = process.env.NODE_ENV !== 'production';
const allowedOrigins = [
    process.env.FRONTEND_ORIGIN,
    ...(isDev ? ['http://localhost:5173', 'http://127.0.0.1:5173'] : []),
].filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    console.log('CORS check for:', origin); // TEMP: confirm what the browser sends
    if (!origin) return cb(null, true);     // server-to-server, curl, etc.
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // If you want to be flexible about localhost hostnames/ports:
    try {
      const { hostname, port, protocol } = new URL(origin);
      if ((hostname === 'localhost' || hostname === '127.0.0.1') && port === '5173' && (protocol === 'http:' || protocol === 'https:')) {
        return cb(null, true);
      }
    } catch (_) {}

    cb(new Error('CORS origin error'));
  },
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// app.options('/(.*)', cors());

app.get('/healthz', (req, res) => res.status(200).send('ok'));

app.get('/tasks/warmup', (req, res) => {
  if (!TASK_SECRET || req.get("X-Task-Secret") !== TASK_SECRET) {
    return res.sendStatus(401);
  }

  return res.sendStatus(204);
})

// app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use('/search', searchRoute);

// app.get("/*splat", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// })




app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
    console.log(`Listening to port ${process.env.PORT || 4000}`);
})