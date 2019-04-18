DROP DATABASE IF EXISTS bamazon;

-- Create and and access a database named 'bamazon' --
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table named 'products' that will hold products --
CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);
-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Canon EOS Rebel T7i DSLR', 'Cameras', 699.00, 15),
        ('Leica C-Lux Digital', 'Cameras', 1050.00, 5),
        ('Sony WH-1000XM3', 'Headphones',349.99, 20),
        ('BOSE QuietComfort 35', 'Headphones', 349.00, 46),
        ('Echelon Smart Connect', 'Studio Bike', 999.00, 5),
        ('NordicTrack s22i', 'Studio Bike', 1999.00, 5),
        ('Samsung M5300 50"', 'Smart TV', 397.99, 25),
        ('LG UK6090PUA', 'Smart TV', 326.99, 30),
        ('Microsoft Xbox One S', 'Gaming', 299.00, 50),
        ('Microsoft Xbox One X', 'Gaming', 449.75, 40),
        ('Nintendo Switch', 'Gaming', 297.99, 100),
        ('Lego Millennium Falcom', 'Toys', 799.99, 5),
        ('Lego Hogwarts Castle', 'Toys', 399.99, 5),
        ('Hellboy Action Figure', 'Collectibles', 80.00, 13),
        ('Pennywise Action Figure', 'Collectibles', 100.00, 10);
