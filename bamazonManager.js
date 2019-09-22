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

var table = new Table({
    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity', 'Product Sales' ]    
   ,colWidths: [10,20,20,20,15, 17]
});


function menuOptions() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View low inventory",
      "Add to inventory",
      "Add products",
      "Exit"
    ]
  }).then(function(answer) {
    switch(answer.action) {
      case "View Products for Sale":
        showAll();
        break;
      case "View low inventory":
        viewLow();
        break;
      case "Add to inventory":
        addInventory();
        break;
      case "Add products":
        addProducts();
        break;
      case "Exit":
        conn.end();
        break;
    }
  });
}

function showAll() {// display all items for sale
  connection.query("select * from products", function(err, res) {
    if(err) throw err;
     table = new Table({
     head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity', 'Product Sales' ]    
     ,colWidths: [10,20,20,20,15, 17]
});
    for (var i = 0; i < res.length; i++) {
            table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
      }
      console.log(table.toString());
      menuOptions()
    });
}

function viewLow() {// display products with low inventory
  connection.query("select * from products WHERE stock_quantity < 5", function(err, res) {
    if(err) throw err;
    table = new Table({
       head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity', 'Product Sales' ]    
    ,colWidths: [10,20,20,20,15, 17]
    });
    
    for (var i = 0; i < res.length; i++) {
      
            table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
      }
      console.log(table.toString());
      
      menuOptions()
    });
}

function addInventory() {// add new inventory
  inquirer.prompt([
    {
    name: "id",
    type: "input",
    message: "Which item number would like to update?"
  }, 
  {
    name: "qty",
    type: "input",
    message: "How many would like to add?"
  }
  ])
  .then(function(custInput) { 
      connection.query("UPDATE products SET stock_quantity = " + custInput.qty + " WHERE item_id = " + custInput.id, function(err, resUpdate) {
        if(err) throw err;
        console.log(resUpdate.affectedRows + " products updated!\n");
        menuOptions()
      });
    })
};
    
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
        stock_quantity: add.qty,
        product_sales: 0.00
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

menuOptions()



