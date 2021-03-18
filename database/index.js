const postgres = require('postgres');
const sql = postgres



//sudo -u postgres -i

DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;


CREATE TABLE IF NOT EXISTS Public."reviews"(
  Id int,
  product_id int,
  rating int,
  date date,
  summary varchar(1000),
  body varchar(1000),
  recommend bool,
  reported bool,
  reviewer_name varchar(100),
  reviewer_email varchar(100),
  response varchar(1000),
  helpfulness int
  );


  CREATE TABLE IF NOT EXISTS Public."reviews_photos"(
    Id int,
    review_id int,
    url varchar(1000)
    );

CREATE TABLE IF NOT EXISTS Public."characteristics"(
  Id int,
  product_id int,
  name varchar(100)
  );

CREATE TABLE IF NOT EXISTS Public."characteristic_reviews"(
  Id int,
  characteristic_id int,
  review_id int,
  value int
  );

 \COPY Public."reviews" FROM '/Users/carmenhilbert/Public/catwalk_data/reviews.csv' DELIMITER ',' CSV HEADER;

 \COPY Public."reviews_photos" FROM '/Users/carmenhilbert/Public/catwalk_data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

 \COPY Public."characteristics" FROM '/Users/carmenhilbert/Public/catwalk_data/characteristics.csv' DELIMITER ',' CSV HEADER;

 \COPY Public."characteristic_reviews" FROM '/Users/carmenhilbert/Public/catwalk_data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;