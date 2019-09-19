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
    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity']    
   ,colWidths: [10,20,20,20,15]
});


function showAll() {// display all items for sale
  connection.query("select * from products", function(err, res) {
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
            table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
    console.log(table.toString());
    buy()
  }
  
  });
}

function buy() { // prompt to ask customer what they would like to purchase
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: "Which item number would like to purchase?"
  }, 
  {
    name: "qty",
    type: "input",
    message: "How many would like to purchase?"
  }])
  .then(function(custInput) { 
    var itemNum = custInput.id
    var quantity = custInput.qty
    custOrder(itemNum, quantity);
    })
}

function custOrder (id, qty) {//checks product availablity, notifies customer accodingly, updates database
  var test = connection.query("SELECT item_id, product_name, price, stock_quantity from products WHERE item_id = "  + id, function(err, res) { 
    if(err) throw err;
    if (qty <= res[0].stock_quantity){
      var totalCost = parseFloat(res[0].price) * parseFloat(qty);
      console.log("Your total cost for " + qty + " "  + res[0].product_name + " is $" + totalCost );
      
      var update = connection.query("UPDATE products SET stock_quantity = stock_quantity - " + qty + "WHERE item_id = " + id, function(err, res1) { 
        if(err) throw err;
        console.log(res1.affectedRows + " products updated!\n");
      });
    }
      else {
        console.log("Sorry we do not have enough " + res[0].product_name + "to complete your order.");
      };
      connection.end();
    });
  };

buy()

