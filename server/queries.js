const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

const getReviews = (request, response) => {
  //console.log('request', request);
 // console.log('request.body', request.body);
  var productId = request.query.product_id;
 // console.log('product_Id,', productId);
 // console.log('params', request.params);
  var sort = request.query.sort;
  var sortString = '';
  if (sort === 'helpful') {
    sortString = 'helpfulness DESC;';
  } else if (sort === 'relevant') {
    sortString = 'helpfulness DESC, date DESC;';
  } else if (sort === 'newest') {
    sortString = 'date DESC;';
  }
 // console.log('sort', sort);
  pool.query('SELECT * FROM reviews WHERE (product_id = ' + productId + ' AND reported = false) ORDER BY ' + sortString)
  .then((res) => {
    console.log('response', res.rows);
    response.json(res.rows)
  })
  .catch(err => console.error('Error executing query', err.stack))
  //SELECT * FROM reviews WHERE (product_id = 2 AND reported = false) ORDER BY helpfulness DESC LIMIT 5
}

const getMetadata = (request, response) => {
  console.log('hi from get metadata');

}

const updateHelpful = (request, response) => {
    var reviewId = request.params.review_id;
    console.log(reviewId);
    pool.query('SELECT helpfulness FROM reviews WHERE (id = ' + reviewId + ')')
    .then((res) =>  {
      console.log('helpfulness', res.rows[0].helpfulness)
      var update = res.rows[0].helpfulness + 1
      pool.query('UPDATE reviews SET helpfulness = ' + update + 'WHERE (id = ' + reviewId + ')')
    })
    .then(response.status(204).end())
    .catch(err => console.error('Error executing query', err.stack))
}

const reportReview = (request, response) => {
  var reviewId = request.params.review_id;
  console.log(reviewId);
  pool.query('UPDATE reviews SET reported =  true WHERE (id = ' + reviewId + ')')
    .then(response.status(204).end())
    .catch(err => console.error('Error executing query', err.stack))
}

module.exports = {
  getReviews,
  updateHelpful,
  reportReview
}