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

// init prompts to choose tasks available
function managerTasks() {
    inquirer
        .prompt({
            name: "manager",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Quit"
            ]
            })
            .then(function(task) {
                switch (task.manager) {
                case "View Products for Sale":
                    viewInventory();
                    break;
            
                case "View Low Inventory":
                    whatToOrder();
                    break;
            
                case "Add to Inventory":
                    orderStuff();
                    break;
            
                case "Add New Product":
                    newInventory();
                    break;

                case "Quit":
                    console.log("See you soon!");
                    connection.end();
                    break;
                }
    });
};

// displays inventory in a neat table
function viewInventory() {

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

            // cli-table build
            var table = new Table({
                head: ["Item Id", "Product", "Price", "Department", "In-Stock"]
            , colWidths: [10, 35, 10 , 15 , 10]
            });
            
            //push data to table
            for (i = 0; i < res.length; i++) {
                table.push(
                    [res[i].item_id, res[i].product_name, res[i].price, res[i].department, res[i].stock_quantity]
                )
            }
            // displays table
            console.log(table.toString());
            isThatAll();
    });
};

// checks for low inventory
function whatToOrder() {

    var query = "SELECT position, product_name, stock_quantity FROM products WHERE <?"

    connection.query(query, [5] ,function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].position + " | " + res[i].product_name + " | " + res[i].stock_quantity);
        }
    });
};

// allows manager to add to product totals
function orderStuff() {

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

    });
};

// allows manager to add new products
function newInventory() {

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

    });
};

// end function
function isThatAll(){

    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Do you need to do anything else?"
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

managerTasks();