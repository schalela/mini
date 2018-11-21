const express = require('express');
const server = express();
const db = require('./db.json');
const port = process.env.PORT || 8000;

server.use(express.json());

server.get('/currentUser', (req, res) => {
  return res.status(200).jsonp({ currentUser: db.currentUser });
});

server.delete('/init/auth', (req, res) => {
  db.currentUser = null;
  return res.status(201).jsonp({});
});


server.post('/init/auth', (req, res) => {
  const { body: { loginRequest: { credentials: { usernamePassword: { username: email, password } } } } } = req;
  const result = db.users.find(user => user.email === email && user.password === password);

  if (!result) {
    return res.status(401).jsonp({
      "status": {
        "code": "API-442",
        "message": "invalid login"
      }
    });
  };

  db.currentUser = result.email;

  return res.status(200).jsonp({
    "status": {
      "code": "API-200",
      "message": "message"
    },
    "loginResponse": {
      "type": "bearer",
      "value": result.token,
      "expires": "23/11/18 5:48 PM",
      "idleTimeout": 600,
      "lastLoginTime": 1542775718529
    }
  });
});

server.listen(port);
