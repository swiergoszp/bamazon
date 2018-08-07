// necissary npms
var inquirer = require("inquirer");
var mysql = require("mysql");

// npm that displays info as table in terminal
var Table = require("cli-table");

// mysql connect params
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "redwings19",
	database: "bamazonDB"
});

// displays available products in a table
function showTheGoods() {

    connection.query('SELECT * FROM products', function(error, response) {
        if (error) throw error;

            // cli-table build
            var table = new Table({
                head: ["Item Id", "Product", "Price"]
            , colWidths: [10, 35, 10]
            });
            
            //push data to table
            for (i = 0; i < response.length; i++) {
                table.push(
                    [response[i].id, response[i].product_name, response[i].price]
                )
            }
            console.log(table.toString());

            inquirer.prompt([{
                type: "confirm",
                name: "reply",
                message: "Would you like to purchase an item?"
            }]).then(function(ans){
                if (ans.reply){
                    goShopping();
                } 
                    else {
                        console.log("See you soon!");
                        connection.end();
                    }
        });
    });
};

function goShopping() {

    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "What is your desired items ID?",
            validate: function(value) {
                if (isNaN(value) == false && parseInt(value) <= response.length && parseInt(value) > 0) {
                    return true;
                } 
                    else {
                        return false;
                    }
            }
        }, 
        {
            name: "quantity",
            type: "input",
            message: "How many of this item would you like to buy?",
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                } 
                    else {
                        return true;
                    }
            }
        }
        ]).this(function(choice){
            var what = (choice.id) - 1;
            var product = response[what];
            var quantity = choice.quantity;
            if (quantity < product.stock_quantity) {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {stock_quantity: product.stock_quantity - quantity}, 
                    {id: product.id}
                ],  function(err, result) {
                        if (err) throw err;
                        console.log("Your total for " + quantity + " - " + product.name + " is: " + product.price.toFixed(2) * quantity);
                    });

            } 
                else {
                    console.log("Sorry, we don't have that many, we can only sell " + product.stock_quantity + ".");
                };
    });
    isThatAll();
};

//asks if they would like to purchase another item
function isThatAll(){

    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function(ans){
        if (ans.reply){
            goShopping();
        } 
            else {
                console.log("See you soon!");
            }
    });
};

showTheGoods();