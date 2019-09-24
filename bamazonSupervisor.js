var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var currencyFormatter = require('currency-formatter');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
 //console.log("connected as id " + connection.threadId);
});

console.log("\n--------------------------------------------------------------------------------------\n");
  console.log("                              Welcome to Bamazon.com              ")
console.log("\n-------------------------------------------------------------------------------------\n");

function menuOptions() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View Sales by Department",
      "Add new Department",
      "Exit"
    ]
  }).then(function(answer) {
    switch(answer.action) {
      case "View Sales by Department":
        viewSalesbyDept();
        break;
      case "Add new Department":
        addDepartment();
        break;
      case "Exit":
        connection.end();
        break;
    }
  });
}

function viewSalesbyDept(){
   connection.query("SELECT products.department_name, products.product_sales, departments.department_name, departments.over_head_cost, departments.department_id FROM products JOIN departments WHERE departments.department_name = products.department_name GROUP by departments.department_id", function(err, res) {
        if(err) throw err;
        
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Overhead Sales', 'Product Sales', "Total Profit" ]    
        ,colWidths: [20, 20,20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {

          var total_profit = res[i].over_head_cost - res[i].product_sales
              table.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_cost, res[i].product_sales, total_profit]
            );
        };
        console.log(table.toString());
        
    });
    menuOptions()
}

function addDepartment(){ 
  inquirer
  .prompt([
  {
      type: "input",
      message: "What department would you like to add?",
      name: "dept"
  },  
  {
      type: "input",
      message: "What is the overhead cost?",
      name: "overhead"
  },  
   

      
  ]).then(function(addDept) {
    console.log("Updating departments...\n");
    var query = connection.query(
      "INSERT INTO departments SET ? ",
      [
        {
        department_name: addDept.dept,
        over_head_cost: addDept.overhead,
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items updated!\n");
        menuOptions()
      }
    );
  });
};

menuOptions()


