const postgres = require('postgres');
const sql = postgres
//const db = require('./queries')



//sudo -u postgres psql
//password is password
//\l lists databases
// \c database connects to a database
//\dt shows tables


DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

//tables that match original csv files
DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS Public."reviews"(
  review_id int,
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
  helpfulness int,
  PRIMARY KEY(review_id)
  );

CREATE INDEX product ON reviews (product_id);

DROP TABLE IF EXISTS reviews_photos;

  CREATE TABLE IF NOT EXISTS Public."reviews_photos"(
    Id int,
    review_id int,
    url varchar(1000)
    );

DROP TABLE IF EXISTS characteristics;

CREATE TABLE IF NOT EXISTS Public."characteristics"(
  characteristic_id int,
  product_id int,
  name varchar(100),
  PRIMARY KEY(characteristic_id)
  );

CREATE INDEX productID ON characteristics (product_id);

DROP TABLE IF EXISTS characteristic_reviews;
CREATE TABLE IF NOT EXISTS Public."characteristic_reviews"(
  Id int,
  characteristic_id int references characteristics(characteristic_id),
  review_id int references reviews(review_id),
  value int
  );

  CREATE INDEX characteristicID ON characteristic_reviews (characteristic_id);
  CREATE INDEX reviewID ON characteristic_reviews (review_id);
  // CONSTRAINT fk_characteristic
  //   FOREIGN KEY(characteristic_id)
  //    REFERENCES characteristics(characteristic_id)

//these commands import the csv data
 \COPY Public."reviews" FROM '/Users/carmenhilbert/Public/catwalk_data/reviews.csv' DELIMITER ',' CSV HEADER;
 //\COPY Public."reviews" FROM '/home/ubuntu/catwalk/reviews.csv' DELIMITER ',' CSV HEADER;

 \COPY Public."reviews_photos" FROM '/Users/carmenhilbert/Public/catwalk_data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
 // \COPY Public."reviews_photos" FROM '/home/ubuntu/catwalk/reviews_photos.csv' DELIMITER ',' CSV HEADER;

 \COPY Public."characteristics" FROM '/Users/carmenhilbert/Public/catwalk_data/characteristics.csv' DELIMITER ',' CSV HEADER;
 //COPY Public."characteristics" FROM '/home/ubuntu/catwalk/characteristics.csv' DELIMITER ',' CSV HEADER;

 \COPY Public."characteristic_reviews" FROM '/Users/carmenhilbert/Public/catwalk_data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
 //\COPY Public."characteristic_reviews" FROM '/home/ubuntu/catwalk/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

 //new better tables


 //-product_id,
 CREATE TABLE IF NOT EXISTS Public."new_reviews"(
  review_id int,
  rating int,
  date date,
  summary varchar(1000),
  body varchar(1000),
  recommend bool,
  reported bool,
  reviewer_name varchar(100),
  reviewer_email varchar(100),
  response varchar(1000),
  helpfulness int,
  fit int,
  length int,
  comfort int,
  quality int,
  size int,
  width int,
  photo_1 varchar(100),
  photo_2 varchar(100),
  photo_3 varchar(100),
  PRIMARY KEY(review_id)
  );


CREATE TABLE IF NOT EXISTS Public."reviews_by_product"(
  id int GENERATED ALWAYS AS IDENTITY,
  review_id int,
  product_id int,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
     REFERENCES review_metadata(product_id)
     CONSTRAINT fk_review
     FOREIGN KEY(review_id)
      REFERENCES reviews(review_id)
  );


CREATE TABLE IF NOT EXISTS Public."review_metadata"(
  product_id int,
  rating_average int,
  fit_average int,
  length_average int,
  comfort_average int,
  quality_average int,
  size_average int,
  width_average int
  PRIMARY KEY(product_id)
  );

//insert into...select from construct example:

//insert into student (student_id, s_name)
//select student_id, s_name from queue



//scp -i "floyd.pem" /Users/carmenhilbert/Public/catwalk_data/reviews.csv ubuntu@ec2-52-14-141-202.us-east-2.compute.amazonaws.com:/home/ubuntu/catwalk
//scp -i "floyd.pem" /Users/carmenhilbert/Public/catwalk_data/characteristic_reviews.csv ubuntu@ec2-52-14-141-202.us-east-2.compute.amazonaws.com:/home/ubuntu/catwalk
//scp -i "floyd.pem" /Users/carmenhilbert/Public/catwalk_data/reviews_photos.csv ubuntu@ec2-52-14-141-202.us-east-2.compute.amazonaws.com:/home/ubuntu/catwalk
//scp -i "floyd.pem" /Users/carmenhilbert/Public/catwalk_data/characteristics.csv ubuntu@ec2-52-14-141-202.us-east-2.compute.amazonaws.com:/home/ubuntu/catwalk

//chmod 400 floyd.pem
//ssh -i "floyd.pem" ubuntu@ec2-52-14-141-202.us-east-2.compute.amazonaws.com
//ssh -i "floyd.pem" ubuntu@ec2-18-218-26-142.us-east-2.compute.amazonaws.com

//server:
// ssh -i "floyd.pem" ubuntu@ec2-3-128-28-12.us-east-2.compute.amazonaws.com


