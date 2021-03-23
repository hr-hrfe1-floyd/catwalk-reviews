const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

const getReviews = (request, response) => {
  var productId = request.params.product_id;
  console.log(productId);
  var sort = request.params.sort;
  console.log('sort', sort);
  // pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).json(results.rows)
  // })

  //SELECT * FROM reviews WHERE (product_id = 2 AND reported = false) ORDER BY helpfulness DESC LIMIT 5
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