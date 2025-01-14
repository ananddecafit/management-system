const express = require('express');
const path = require('path')


const app = express();


app.use(express.static(path.join(__dirname, 'build')));

// * to allow react sub-paths
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000);