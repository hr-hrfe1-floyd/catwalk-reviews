const express = require('express');
var bodyParser = require('body-parser');
const db = require('./queries.js')


let app = express();
module.exports.app = app;

app.get('/reviews', function (req, res) {
  res.json('hello from get reviews');
});

app.get('/reviews/meta', function (req, res) {
});

app.post('/reviews', function (req, res) {
});

app.put('/reviews/:review_id/helpful', db.updateHelpful);

app.put('/reviews/:review_id/report', db.reportReview);



let port = 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});