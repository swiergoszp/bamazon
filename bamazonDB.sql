DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER (11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR (50) NOT NULL,
    department VARCHAR (20) NOT NULL,
    price DECIMAL (8, 2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
    product_sales DECIMAL (8, 2)
);


-- sports apparel theme : fan shop, gear, apparel  
INSERT INTO products (product_name, department, price, stock_quantity, product_sales)
VALUES  ('Jamal Murray Home Jersey', 'Fan Shop', 179.99, 55, 0),
				('Charlie Blackmon Replica Beard', 'Fan Shop', 68.99, 43, 0),
				('Nathan MacKinnon Home Jersey', 'Fan Shop', 219.99, 2, 0),
				('Von Miller Bobblehead', 'Fan Shop', 39.99, 17, 0),
				('Underarmor Hoodie', 'Apparel', 49.99, 60, 0),
				('Reebok Running Shoes', 'Apparel', 79.95, 88, 0),
				('Nike Graphic Tee', 'Apparel', 34.79, 36, 0),
				('Basketball', 'Gear', 19.98, 32, 0),
				('Hockey Stick', 'Gear', 89.99, 5, 0),
				('Football Helmet', 'Gear', 79.99, 89, 0);
                
                
CREATE TABLE departments (
	department_id INTEGER (11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR (50) NOT NULL,
    over_head_costs DECIMAL (8, 2) NOT NULL,
    total_sales DECIMAL (10, 2) NOT NULL
);


INSERT INTO departments (department_name,  total_sales, over_head_costs)
VALUES ('Fan Shop', 50000.00, 28000.00),
				('Apparel', 20000.00, 12000.00),
				('Gear', 30000.00, 15000.00)
                
                
                