const express = require('express');
const app = express();

// middleware to serve static content like images
app.use(express.static('public'));

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ➡ PORT ${server.address().port} `);
});
