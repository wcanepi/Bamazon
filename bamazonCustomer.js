// load Node.js modules
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');

//Load database credential for .env
const keys = require('./keys');

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'bamazon',
    user: keys.mysql.username,
    password: keys.mysql.password
  
});

db.connect()

//check that input numbers are positive numbers
function validInput(value) {
    const intNumber = Number.isInteger(parseFloat(value));
    const sign = Math.sign(value);
    if (intNumber && (sign === 1)) {
        return true;
    } else {
        return 'Please use whole non-zero numbers only.';
    }
}
// prompt the shopper for the item id and quantity of product to purchase
 
function promptShopper() {
    // Prompt shopper to select an item by id
    console.log(` 
 
    // \n-------------------------------------------------------------------\n`);
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID of the product you want to purchase.',
            validate: validInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many of these would you like to purchase?',
            validate: validInput,
            filter: Number
        }
    ]).then(function (input) {
        const item = input.item_id;
        const quantity = input.quantity;
        // Query the db to confirm that the given item ID exists in the desired quantity
        let querySelect = 'SELECT * FROM products WHERE ?';
        db.query(querySelect, { item_id: item }, function (err, data) {
            if (err) throw err;
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayStock();
            } else {
                const productData = data[0];
                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Success, the product is available in this quantity! << Order Confirmed! >>');
                    // Construct the updating query string
                    const updatequerySelect = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    // Update the inventory
                    db.query(updatequerySelect, function (err, data) {
                        if (err) throw err;
                        console.log('\n---------------------------------------------------------------------\n'
                            + 'Your order has been placed! Your total is $' + productData.price * quantity
                            + '\n---------------------------------------------------------------------\n'
                            + '\n Thank you for shopping at Bamazon! \n');
                        // End the db connection
                        db.end();
                    })
                } else {
                    console.log('\n---------------------------------------------------------------------\n'
                        + 'Sorry, there is not enough product in stock. \n Please adjust your quantity.'
                        + '\n---------------------------------------------------------------------\n');
                    //display inventory again
                    displayStock();
                }
            }
        })
    })
}

//retrieve what's in-stock from the database and output it to the console
function displayStock() {
     // Query db for all items
    querySelect = 'SELECT * FROM products';
    // build the db query
    db.query(querySelect, function (err, data) {
        if (err) throw err;
        // console.log(` 
     
        // // \n-------------------------------------------------------------------\n`);
        console.log('Current Inventory: ');
        console.log('<___________________>\n');
        let inStock = '';
        for (let i = 0; i < data.length; i++) {
            inStock = '';
            inStock += 'Item ID: ' + data[i].item_id + '     |     ';
            inStock += 'Product Name: ' + data[i].product_name + '     |     ';
            inStock += 'Department: ' + data[i].department_name + '     |     ';
            inStock += 'Price: $' + data[i].price + '     |     ';
            inStock += 'In Stock: ' + data[i].stock_quantity + '\n';
            console.log(inStock);
        }
        console.log("---------------------------------------------------------------------\n");
        //Prompt the user for item/quantity
        promptShopper();
    })
}
// runApp will execute the main application 
function runApp() {
    // Display the available inventory
    displayStock();
}
// Run the application
runApp();
