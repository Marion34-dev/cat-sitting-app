require('module-alias/register');
const express = require('express');
const loginRoute = require('@loginRoute');
const registerRoute = require('@registerRoute');
const profileRoute = require('@profile');
const corsMiddleware = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware());
app.use(express.json());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/profile', profileRoute);

app.get('/', (req, res) => {
  res.send('Welcome to my application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
