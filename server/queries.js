const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

//host:  3.128.28.12
//18.218.26.142

const getReviews = (request, response) => {
  //console.log('request', request);
 // console.log('request.body', request.body);
 console.log('request.query.product_id', request.query.product_id);
  var productId = request.query.product_id;
 // console.log('product_Id,', productId);
  //console.log('params', request.params);
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

//old version for comparison:
// const getMetadata = (request, response) => {
//   console.log('hi from get metadata');
//   var productId = request.query.product_id;
//   console.log('productId, ', productId);
//   //create characteristics object
//   var characteristics = {};
//   var characteristic_ids = [];
//   //get a list of the characteristics that have been reviewed for that product
//   // pool.query('SELECT * FROM characteristics WHERE (product_id = ' + productId + ');')
//   pool.query( 'SELECT characteristic_reviews.characteristic_id, characteristic_reviews.value, characteristics.name FROM characteristics JOIN characteristic_reviews ON characteristic_reviews.characteristic_id = characteristics.characteristic_id JOIN reviews ON reviews.review_id = characteristic_reviews.review_id WHERE reviews.product_id =' + productId + ';')

//   .then((res) => {
//     console.log('response from characteristics table', res.rows);
//     for (var i = 0; i < res.rows.length; i++) {
//       var char = res.rows[i].name;
//       if (characteristics[char] !== undefined) {
//         characteristics[char].values.push(res.rows[i].value);
//         characteristics[char].average = characteristics[char].values.reduce((a, b) => (a + b)) / characteristics[char].values.length
//         }
//       else {
//         characteristics[char] = {
//           id: res.rows[i].characteristic_id,
//           values: [res.rows[i].value],
//           average: res.rows[i].value
//         }
//       }
//     }

//     //console.log('characteristics object', characteristics);
//   })
//   .then(()=> {
//     response.json({product_id: productId, characteristics: characteristics})
//   })
//   .catch(err => console.error('Error executing query', err.stack))
// }

const getMetadata = (request, response) => {
  //console.log('hi from get metadata');
  var productId = request.query.product_id;
  console.log('productId, ', productId);
  //create characteristics object
  var characteristics = {};

  pool.query('SELECT characteristics.name,AVG (characteristic_reviews.value):: NUMERIC(10,2) FROM characteristics JOIN characteristic_reviews ON characteristic_reviews.characteristic_id = characteristics.characteristic_id JOIN reviews ON reviews.review_id = characteristic_reviews.review_id WHERE reviews.product_id = ' + productId + 'GROUP BY characteristic_reviews.characteristic_id, characteristics.name ORDER BY characteristics.name;')
  .then((res) => {
    //console.log('new query', res.rows)
    response.json({product_id: productId, characteristics: res.rows})
  })
  .catch(err => console.error('Error executing query', err.stack))
}





const updateHelpful = (request, response) => {
    var reviewId = request.params.review_id;
    console.log(reviewId);
    pool.query('SELECT helpfulness FROM reviews WHERE (review_id = ' + reviewId + ')')
    .then((res) =>  {
      console.log('helpfulness', res.rows[0].helpfulness)
      var update = res.rows[0].helpfulness + 1
      pool.query('UPDATE reviews SET helpfulness = ' + update + 'WHERE (review_id = ' + reviewId + ')')
    })
    .then(response.status(204).end())
    .catch(err => console.error('Error executing query', err.stack))
}

const reportReview = (request, response) => {
  var reviewId = request.params.review_id;
  console.log(reviewId);
  pool.query('UPDATE reviews SET reported =  true WHERE (review_id = ' + reviewId + ')')
    .then(response.status(204).end())
    .catch(err => console.error('Error executing query', err.stack))
}

module.exports = {
  getReviews,
  updateHelpful,
  reportReview,
  getMetadata
}





// SELECT
//   characteristic_reviews.characteristic_id,
//   characteristic_reviews.value,
//   characteristics.name
// FROM characteristics
// JOIN characteristic_reviews
//   ON characteristic_reviews.characteristic_id = characteristics.characteristic_id
// JOIN reviews
//   ON reviews.review_id = characteristic_reviews.review_id
// WHERE reviews.product_id = 1
// ORDER BY characteristics.name;

// SELECT
//   characteristic_reviews.characteristic_id,
//   characteristics.name,
//   AVG (characteristic_reviews.value):: NUMERIC(10,2)
// FROM characteristics
// JOIN characteristic_reviews
//   ON characteristic_reviews.characteristic_id = characteristics.characteristic_id
// JOIN reviews
//   ON reviews.review_id = characteristic_reviews.review_id
// WHERE reviews.product_id = 17997
// GROUP BY characteristic_reviews.characteristic_id, characteristics.name
// ORDER BY characteristics.name;


