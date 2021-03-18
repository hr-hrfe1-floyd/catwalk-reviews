const postgres = require('postgres');
const sql = postgres



//sudo -u postgres -i

//CREATE TABLE IF NOT EXISTS Public."reviews"(Id int, product_id int, date date, summary varchar(1000), body varchar(1000), reported bool, reviewer_name varchar(100), reviewer_email varchar(100), response varchar(1000), helpfulness int);

 \COPY Public."reviews" FROM '/Users/carmenhilbert/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;