require('module-alias/register')
const express = require('express');
const loginRoute = require('@loginRoute'); 
const registerRoute = require('@registerRoute');


// Start server
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/login', loginRoute);
app.use('/register', registerRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to my application!');
});

