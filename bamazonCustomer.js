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
	password: "",
	database: "bamazonDB"
});

// displays available products in a table
function showTheGoods() {

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

            // cli-table build
            var table = new Table({
                head: ["Item Id", "Product", "Price" , "In-Stock"]
            , colWidths: [7, 35, 10, 7]
            });
            
            //push data to table
            for (i = 0; i < res.length; i++) {
                table.push(
                    [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
                )
            }
            // displays table
            console.log(table.toString());

            // prompts for purchase info
            inquirer.prompt([{
                    name: "id",
                    type: "input",
                    message: "What is your desired items ID?",
                    validate: function(value) {
                        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
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
                // runs choices through a res and adjusts DB
                ]).then(function(choice){

                    var what = choice.id - 1;
                    var product = res[what];
                    var quantity = parseInt(choice.quantity);
                    var total = parseFloat((product.price * quantity).toFixed(2));

                    if (quantity <= product.stock_quantity) {
                        connection.query(
                            "UPDATE products SET ? WHERE ?", 
                            [
                            {
                                stock_quantity: product.stock_quantity - quantity
                            }, 
                            {
                                item_id: choice.id
                            }
                            ],  
                            function(err, result) {
                                if (err) throw err;
                                console.log("Your total for " + quantity + " - " + product.product_name + " is: $" + total);
                        });

                        connection.query("SELECT * FROM departments", function(err, result){
                            if(err) throw err;
                            var index;
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].department_name === product.department_name){
                                    index = results[i];
                                }
                            }
                            
                            connection.query("UPDATE departments SET ? WHERE ?", [
                            {
                                total_sales: (index.total_sales) + total
                            },
                            {
                                department_name: product.department_name
                            }
                            ], function(err, result){
                                if(err) throw err;
                            });
                        });
                    } 
                        else {
                            console.log("Sorry, we don't have that manyin stock.");
                            isThatAll();
                        };
            });
    });
};

//asks if they would like to purchase another item
function isThatAll(){

    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function(ans){
        if (ans.reply){
            showTheGoods();
        } 
            else {
                console.log("See you soon!");
                connection.end();
            }
    });
};

showTheGoods();