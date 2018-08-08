DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER (11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR (50) NOT NULL,
    department VARCHAR (20) NOT NULL,
    price DECIMAL (8, 2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL
);


-- sports apparel theme : fan shop, gear, apparel  
INSERT INTO products (product_name, department, price, stock_quantity)
VALUES  ('Jamal Murray Home Jersey', 'Fan Shop', 179.99, 55),
				('Charlie Blackmon Replica Beard', 'Fan Shop', 68.99, 43),
				('Nathan MacKinnon Home Jersey', 'Fan Shop', 219.99, 2),
				('Von Miller Bobblehead', 'Fan Shop', 39.99, 17),
				('Underarmor Hoodie', 'Apparel', 49.99, 60),
				('Reebok Running Shoes', 'Apparel', 79.95, 88),
				('Nike Graphic Tee', 'Apparel', 34.79, 36),
				('Basketball', 'Gear', 19.98, 32),
				('Hockey Stick', 'Gear', 89.99, 5),
				('Football Helmet', 'Gear', 79.99, 89);