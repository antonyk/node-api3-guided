const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware - every request will run through it
server.use(express.json());  // built-in middleware, always installed with express, no need to npm install it.
server.use(morgan("dev")); // third party

server.use(function(req, res, next) {
  const today = new Date().toISOString();
  console.log(`[${today}] ${req.method} to ${req.url}`);
  next();
})

server.use(gate);
// check headers for a password property else return status 400, message: "speak friend and enter"
// if there is, check that it is "mellon"
// if it is, call next; else return status 401 and { you: "cannot pass!" }

function gate(req, res, next) {
  if (!req.headers.password) res.status(400).json({ message: "speak friend and enter"})
  if (!(typeof password === 'string')) res.status(401).json({ message: "you cannot pass!" })
  if (req.headers.password !== "melon") res.status(401).json({ message: "you cannot pass!" })
  next();
}

server.get('/moria', (req, res) => {
  res.status(200).json({ welcome: "friends" });
})

server.use('/api/hubs', gate, role("fellowship"), hubsRouter);

function role(roleName) {
  return function(req, res, next) {
    let role = req.headers.role
    if (role && role === roleName) {
      next();
    } else {
      res.status(403).json({ you: "have no power here "})
    }
  }
}

function errorHandler(error, req, res, next) {
  res.status(500).send("");
}

function namePrep(req, res, next) {
  req.name = "AK"
  next();
}

server.get('/', namePrep, (req, res) => {
  const name = (req.name) ? ` ${req.name}` : 'stranger';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${name} to the Lambda Hubs API</p>
    `);
});

server.use(errorHandler)

module.exports = server;
