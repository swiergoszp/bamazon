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
    inquirer.prompt({
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
        }).then(function(task) {
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
            , colWidths: [7, 35, 10 , 15 , 7]
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

    var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity<=?"

    connection.query(query , [5], function(err, res) {
        if (err) throw err;

        // cli-table build
        var table = new Table({
            head: ["Item Id", "Product", "In-Stock"]
        , colWidths: [10, 35, 10]
        });
        
        //push data to table
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].stock_quantity]
            )
        }
        // displays table
        console.log(table.toString());
        isThatAll();
    });
};

// allows manager to add to product totals
function orderStuff() {

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

            // cli-table build
            var table = new Table({
                head: ["Item Id", "Product", "Price", "Department", "In-Stock"]
            , colWidths: [7, 35, 10 , 15 , 7]
            });
            
            //push data to table
            for (i = 0; i < res.length; i++) {
                table.push(
                    [res[i].item_id, res[i].product_name, res[i].price, res[i].department, res[i].stock_quantity]
                )
            }
            // displays table
            console.log(table.toString());

        inquirer.prompt([{
            name: "item",
            type: "input",
            message: "Select item ID you wish to order?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, 
        {
            name: "order",
            type: "input",
            message: "How many do you need?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(function(input){
            var quantity;
            for (var i = 0; i < res.length; i++){
                if(res[i].item_id === (input.item - 1)){
                    quantity = res[i + 1].stock_quantity;
                }
            }
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: quantity + parseInt(input.order)
                    },
                    {
                        item_id: input.item
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Order Confirmed!");
                    isThatAll();
                }
            );
        });
    });
};

// allows manager to add new products
function newInventory() {

    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the products name?"
    }, 
    {
        name: "department",
        type: "input",
        message: "What department is the item in?"
    },
    {
        name: "price",
        type: "input",
        message: "What will the price of the item be?"
    },
    {
        name: "quantity",
        type: "input",
        message: "How many of this item will be in stock?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
    ]).then(function(input) {

        connection.query("INSERT INTO products SET ?", 
            {
                product_name: input.name,
                department: input.department,
                price: input.price,
                stock_quantity: input.quantity
            },
            function(err) {
                if (err) throw err;
                console.log("That item was added to our for sale list");
                isThatAll();
            } 
        );
    });
};

// end function, maybe
function isThatAll(){

    inquirer.prompt({
        type: "confirm",
        name: "reply",
        message: "Do you need to do anything else?"
    }).then(function(ans){
        if (ans.reply){
            managerTasks();
        } 
            else {
                console.log("See you soon!");
                connection.end();
            }
    });
};

managerTasks();