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

function beTheBoss(){
  inquirer.prompt([{
    type: "list",
    name: "supervisor",
    message: "What would you like to do?",
    choices: [
        "View Product Sales by Department", 
        "Create New Department", 
        "Quit"
    ]
  }]).then(function(ans){
    switch(ans.supervisor){
        case "View Product Sales by Department": viewProductByDept();
        break;
        case "Create New Department": createNewDept();
        break;
        case "Quit": console.log('Bye!');
    }
  });
};

//view product sales by department
function viewProductByDept(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM departments', function(err, res){
        if(err) throw err;
        // cli-table build
        var table = new Table({
            head: ["Id", "Department", "Over-Head" , "Sales", "Profit"]
        , colWidths: [7, 30, 10, 7, 7]
        });
        
        //push data to table
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, (res[i].over_head_costs).toFixed(2), (res[i].total_sales).toFixed(2), (res[i].total_sales - res[i].over_head_costs).toFixed(2)]
            )
        }
        // displays table
        console.log(table.toString());
        beTheBoss();
    })
};

//create a new department
function createNewDept(){
    console.log("Creating a new department");
    //prompts to add name and numbers. if no value is then by default = 0
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Department Name: "
    }, {
        type: "input",
        name: "cost",
        message: "Over Head Cost: ",
        default: 0,
        validate: function(val){
            if(isNaN(val) === false){
                return true;
            }
                else {
                    return false;
                }
        }
    }, {
        type: "input",
        name: "sales",
        message: "Product Sales: ",
        default: 0,
        validate: function(val){
            if(isNaN(val) === false){
                return true;
            }
                else {
                    return false;
                }
        }
    }
    ]).then(function(value){
      connection.query('INSERT INTO Departments SET ?',
      {
            department_name: value.name,
            over_head_costs: value.cost,
            total_sales: value.sales
        }, 
            function(err, res){
                if(err) throw err;
                console.log('Another department was added.');
      })
      beTheBoss();
    });
}

beTheBoss();