DROP DATABASE IF EXISTS bamazon_db;
create database bamazon_db;
use bamazon_db;
    
create table products(
    item_id integer not null AUTO_INCREMENT,
    product_name VARCHAR(100) not null,
    department_name VARCHAR(50),
    price decimal(10,2) not null, 
    stock_quantity integer,
    product_sales decimal(10,2) null,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
    ("Ipad", "Electronics", 650.00, 40), 
    ("Android Phone", "Electronics", 350.00, 140), 
    ("Gas Grill", "Outdoors", 175.00, 10), 
    ("Sleeper Sofa", "Home", 1250.00, 3), 
    ("Kids Shorts", "Clothing", 18.00, 12), 
    ("Organic Popcorn", "Grocery", 12.99, 150), 
    ("Kids Rain coat", "Clothing", 24.00, 5), 
    ("Dish Detergent", "Household", 4.50, 75), 
    ("Eloquent Javascript", "Books", 23.00, 140), 
    ("Almond Milk", "Grocery", 3.00, 25)
    ;

create table departments(
    department_id integer not null AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_cost decimal(10,2) not null, 
    primary key (department_id)
);