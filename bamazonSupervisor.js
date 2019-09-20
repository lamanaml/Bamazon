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


function viewSalesbyDept(){
    connection.query("select department_name, product_sales from products group by  department_name", function(err, res) {
        if(err) throw err;
        var table = new Table({
            head: ['Department Name', 'Product Sales' ]    
        ,colWidths: [20,20]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_name, res[i].product_sales]
            );
        };
        console.log(table.toString());
    });
}

function addProducts(){ 
  inquirer
  .prompt([
  {
      type: "input",
      message: "What item would you like to add?",
      name: "product"
  },  
  {
      type: "input",
      message: "What Department is the item in?",
      name: "categ"
  },  
  {
    type: "input",
    message: "What is the price?",
    name: "price"
  },  
  {
    type: "input",
    message: "How many would you like to add?",
    name: "qty"
  }  
        
  ]).then(function(add) {
    console.log("Updating inventory...\n");
    var query = connection.query(
      "INSERT INTO products SET ? ",
      [
        {
        product_name: add.product,
        department_name: add.categ,
        price: add.price,
        stock_quantity: add.qty
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items updated!\n");
        menuOptions()
      }
    )
  });
};




viewSalesbyDept()


// function newDept
